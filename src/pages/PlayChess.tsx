import { useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';
import { Chess } from 'chess.js';
import { usePlayGame, type PlayerColor } from '../lib/usePlayGame';
import {
  DEFAULT_DIFFICULTY_ID,
  getDifficulty,
} from '../lib/difficulty';
import { useEngineStatus } from '../lib/useEngineStatus';
import { DifficultySelect } from '../components/DifficultySelect';
import { MoveList } from '../components/MoveList';
import { useToast } from '../components/Toast';
import type { PlayedMove } from '../lib/useTrainer';
import {
  boardStyle,
  captureDotStyle,
  darkSquareStyle,
  highlightSquareStyle,
  lightSquareStyle,
  moveDotStyle,
} from '../lib/board';

type SideChoice = 'white' | 'black' | 'random';

export default function PlayChess() {
  const engineStatus = useEngineStatus();
  const { notify } = useToast();

  // Pre-game pickers.
  const [sideChoice, setSideChoice] = useState<SideChoice>('white');
  const [difficultyId, setDifficultyId] = useState(DEFAULT_DIFFICULTY_ID);

  // Committed game settings — only updated when a new game actually starts. A
  // changing `gameKey` remounts the inner game so the hook resets cleanly.
  const [committed, setCommitted] = useState<{
    color: PlayerColor;
    difficultyId: string;
    gameKey: number;
  }>(() => ({
    color: 'white',
    difficultyId: DEFAULT_DIFFICULTY_ID,
    gameKey: 0,
  }));

  function resolveColor(choice: SideChoice): PlayerColor {
    if (choice === 'random') return Math.random() < 0.5 ? 'white' : 'black';
    return choice;
  }

  function startNewGame() {
    if (engineStatus === 'offline') {
      notify('The engine is offline — a game cannot be started.', 'danger');
      return;
    }
    const color = resolveColor(sideChoice);
    setCommitted((c) => ({
      color,
      difficultyId,
      gameKey: c.gameKey + 1,
    }));
    notify(
      `New game — you play ${color} vs the ${getDifficulty(difficultyId).label} engine.`,
      'info',
    );
  }

  const level = getDifficulty(committed.difficultyId);

  return (
    <div className="mx-auto max-w-shell px-4 py-8 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">Play</p>
          <h1 className="font-display text-3xl font-semibold tracking-tightish text-content">
            Play Chess vs Stockfish
          </h1>
          <p className="mt-1 text-sm text-content-muted">
            A full game against the engine at the strength you choose.
          </p>
        </div>
        <EngineBadge status={engineStatus} />
      </div>

      {engineStatus === 'offline' && (
        <div className="mb-6 rounded-xl border border-danger/40 bg-danger/10 p-4">
          <p className="font-display text-sm font-semibold text-danger">
            Engine offline
          </p>
          <p className="mt-1 text-sm text-content-muted">
            The Stockfish engine could not load, so a game cannot be started
            right now. Try reloading the page.
          </p>
        </div>
      )}

      <GameLayout
        key={committed.gameKey}
        color={committed.color}
        level={level}
        engineReady={engineStatus === 'ready'}
        // pickers
        sideChoice={sideChoice}
        onSideChange={setSideChoice}
        difficultyId={difficultyId}
        onDifficultyChange={setDifficultyId}
        onNewGame={startNewGame}
        notify={notify}
      />
    </div>
  );
}

function GameLayout({
  color,
  level,
  engineReady,
  sideChoice,
  onSideChange,
  difficultyId,
  onDifficultyChange,
  onNewGame,
  notify,
}: {
  color: PlayerColor;
  level: ReturnType<typeof getDifficulty>;
  engineReady: boolean;
  sideChoice: SideChoice;
  onSideChange: (s: SideChoice) => void;
  difficultyId: string;
  onDifficultyChange: (id: string) => void;
  onNewGame: () => void;
  notify: (message: string, variant?: 'info' | 'success' | 'danger') => void;
}) {
  const game = usePlayGame(color, level);
  const [orientation, setOrientation] = useState<PlayerColor>(color);

  function handleFlip() {
    setOrientation((o) => (o === 'white' ? 'black' : 'white'));
  }

  function handleResign() {
    if (game.isGameOver) return;
    game.resign();
    notify('You resigned.', 'danger');
  }

  function onPieceDrop(from: Square, to: Square): boolean {
    return game.attemptMove(from, to);
  }

  function onSquareClick(square: Square) {
    game.selectSquare(square);
  }

  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (game.lastMove) {
      styles[game.lastMove.from] = { ...highlightSquareStyle };
      styles[game.lastMove.to] = { ...highlightSquareStyle };
    }
    if (game.selected) {
      styles[game.selected] = {
        ...styles[game.selected],
        backgroundColor: 'rgba(110, 139, 255, 0.35)',
      };
    }
    const probe = new Chess(game.fen);
    for (const target of game.legalTargets) {
      const isCapture = !!probe.get(target as Square);
      styles[target] = {
        ...styles[target],
        ...(isCapture ? captureDotStyle : moveDotStyle),
      };
    }
    return styles;
  }, [game.lastMove, game.selected, game.legalTargets, game.fen]);

  // Adapt the SAN string history to the MoveList's PlayedMove shape.
  const moveListHistory: PlayedMove[] = useMemo(
    () => game.history.map((san) => ({ san, stepIndex: -1 })),
    [game.history],
  );
  const activeMoveIndex = game.history.length - 1;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* BOARD */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[560px] rounded-2xl border border-border/60 bg-raised p-3 shadow-board">
          <Chessboard
            position={game.fen}
            onPieceDrop={onPieceDrop}
            onSquareClick={onSquareClick}
            boardOrientation={orientation}
            arePiecesDraggable={game.isPlayerTurn}
            customBoardStyle={boardStyle}
            customLightSquareStyle={lightSquareStyle}
            customDarkSquareStyle={darkSquareStyle}
            customSquareStyles={squareStyles}
            animationDuration={250}
          />
        </div>

        {/* TURN / STATUS LINE */}
        <div className="mt-4 flex h-6 items-center gap-2 text-sm">
          {game.isGameOver ? (
            <span className="font-medium text-accent">Game over</span>
          ) : game.thinking ? (
            <span className="flex items-center gap-2 text-content-muted">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              Engine is thinking…
            </span>
          ) : game.isPlayerTurn ? (
            <span className="text-content-muted">Your move</span>
          ) : (
            <span className="text-content-muted">
              {game.turn === 'white' ? 'White' : 'Black'} to move
            </span>
          )}
        </div>

        {/* BOARD CONTROLS — kept directly under the board so they're reachable
            without scrolling, especially on mobile. */}
        <div className="mt-3 flex w-full max-w-[560px] items-center gap-2">
          <button
            type="button"
            onClick={onNewGame}
            disabled={!engineReady}
            className="btn-primary flex-1"
          >
            New Game
          </button>
          <button
            type="button"
            onClick={handleResign}
            disabled={game.isGameOver}
            className="btn-ghost flex-1"
          >
            Resign
          </button>
          <button
            type="button"
            onClick={handleFlip}
            className="btn-ghost flex-1"
          >
            Flip
          </button>
        </div>
      </div>

      {/* SIDE PANEL */}
      <aside className="flex flex-col gap-4">
        {/* SETUP */}
        <div className="card-surface p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-content-subtle">
            New game
          </p>

          <div className="mb-4">
            <span className="mb-2 block font-mono text-xs uppercase tracking-wide text-content-muted">
              Your side
            </span>
            <div className="flex flex-wrap gap-2">
              {(['white', 'black', 'random'] as SideChoice[]).map((s) => {
                const active = sideChoice === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onSideChange(s)}
                    aria-pressed={active}
                    className={[
                      'rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                      active
                        ? 'border-primary bg-primary/15 text-content'
                        : 'border-border text-content-muted hover:border-primary/60 hover:text-content',
                    ].join(' ')}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-wide text-content-muted">
              Strength
            </span>
            <DifficultySelect
              value={difficultyId}
              onChange={onDifficultyChange}
            />
          </div>

          <button
            type="button"
            onClick={onNewGame}
            disabled={!engineReady}
            className="btn-primary mt-4 w-full"
          >
            {engineReady ? 'Start new game' : 'Engine unavailable'}
          </button>
        </div>

        {/* STATUS / MOVES */}
        <div className="card-surface divide-y divide-border/70">
          <div className="flex items-center justify-between p-4">
            <span className="font-mono text-xs capitalize text-content-muted">
              You play {color}
            </span>
            <span className="rounded-md border border-border bg-raised px-2 py-0.5 font-mono text-xs text-accent">
              {level.label} · ~{level.elo}
            </span>
          </div>

          <MoveList history={moveListHistory} activeIndex={activeMoveIndex} />
        </div>

        {/* RESULT */}
        {game.isGameOver && game.result && (
          <div className="animate-fade-up rounded-xl border border-accent/40 bg-accent/10 p-4">
            <p className="font-display text-lg font-semibold text-accent">
              Game over
            </p>
            <p className="mt-1 text-sm text-content">{game.result}</p>
            <button
              type="button"
              onClick={onNewGame}
              disabled={!engineReady}
              className="btn-primary mt-3 w-full"
            >
              Play again
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

function EngineBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; dot: string }> = {
    loading: {
      label: 'Engine loading',
      cls: 'border-border text-content-muted',
      dot: 'bg-content-muted animate-pulse',
    },
    ready: {
      label: 'Engine ready',
      cls: 'border-success/40 text-success',
      dot: 'bg-success',
    },
    offline: {
      label: 'Engine offline',
      cls: 'border-danger/40 text-danger',
      dot: 'bg-danger',
    },
  };
  const s = map[status] ?? map.loading;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs ${s.cls}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
