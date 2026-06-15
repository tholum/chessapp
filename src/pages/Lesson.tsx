import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';
import { getOpening, getVariations } from '../data/openings';
import { useTrainer } from '../lib/useTrainer';
import { useEngineStatus } from '../lib/useEngineStatus';
import { useToast } from '../components/Toast';
import { MoveList } from '../components/MoveList';
import {
  boardStyle,
  captureDotStyle,
  darkSquareStyle,
  highlightSquareStyle,
  lightSquareStyle,
  moveDotStyle,
} from '../lib/board';
import { Chess } from 'chess.js';
import { DifficultySelect } from '../components/DifficultySelect';
import { DEFAULT_DIFFICULTY_ID, getDifficulty } from '../lib/difficulty';

export default function Lesson() {
  const { openingId } = useParams<{ openingId: string }>();
  const opening = openingId ? getOpening(openingId) : undefined;

  if (!opening) {
    return (
      <div className="mx-auto flex max-w-shell flex-col items-center px-5 py-32 text-center">
        <p className="eyebrow mb-4">Not found</p>
        <h1 className="font-display text-4xl font-semibold tracking-tightish">
          We couldn&rsquo;t find that opening
        </h1>
        <p className="mt-3 max-w-prose text-content-muted">
          It may not exist yet. Browse the available openings on the home page.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </div>
    );
  }

  return <LessonInner key={opening.id} openingId={opening.id} />;
}

function LessonInner({ openingId }: { openingId: string }) {
  const opening = getOpening(openingId)!;
  const variations = useMemo(() => getVariations(opening), [opening]);

  const [variationId, setVariationId] = useState(variations[0].id);
  const [randomMode, setRandomMode] = useState(false);
  const [difficultyId, setDifficultyId] = useState(DEFAULT_DIFFICULTY_ID);
  const activeVar =
    variations.find((v) => v.id === variationId) ?? variations[0];

  const line = useMemo(
    () => ({
      key: `${opening.id}:${activeVar.id}`,
      side: opening.side,
      name: opening.name,
      steps: activeVar.steps,
    }),
    [opening.id, opening.side, opening.name, activeVar],
  );

  const trainer = useTrainer(line);
  const engineStatus = useEngineStatus();
  const { notify } = useToast();

  /** Pick a random variation id, preferring one different from `avoid`. */
  function randomVariationId(avoid?: string): string {
    const pool =
      variations.length > 1 && avoid
        ? variations.filter((v) => v.id !== avoid)
        : variations;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx].id;
  }

  function selectVariation(id: string) {
    setRandomMode(false);
    setVariationId(id);
    const v = variations.find((x) => x.id === id);
    if (v) notify(`Now training: ${v.name}.`, 'info');
  }

  function pickRandom() {
    setRandomMode(true);
    const id = randomVariationId(variationId);
    setVariationId(id);
    const v = variations.find((x) => x.id === id);
    notify(`Surprise line: ${v?.name ?? 'random variation'}.`, 'info');
  }

  function handleRestart() {
    if (randomMode && variations.length > 1) {
      setVariationId((cur) => randomVariationId(cur));
    }
    trainer.reset();
    setOrientation(opening.side);
    notify('Lesson reset.', 'info');
  }

  const [showHint, setShowHint] = useState(false);
  const [orientation, setOrientation] = useState<'white' | 'black'>(
    trainer.boardOrientation,
  );

  // Reset hint visibility when the step changes.
  useEffect(() => {
    setShowHint(false);
  }, [trainer.currentStep, trainer.phase]);

  // Surface wrong-move feedback as a toast too (in addition to inline panel).
  useEffect(() => {
    if (trainer.feedback.kind === 'wrong') {
      notify(trainer.feedback.message, 'danger');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainer.feedback.nonce]);

  // Square styles: last move wash, selection, and legal-move dots.
  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (trainer.lastMove) {
      styles[trainer.lastMove.from] = { ...highlightSquareStyle };
      styles[trainer.lastMove.to] = { ...highlightSquareStyle };
    }
    if (trainer.selected) {
      styles[trainer.selected] = {
        ...styles[trainer.selected],
        backgroundColor: 'rgba(110, 139, 255, 0.35)',
      };
    }
    const game = new Chess(trainer.fen);
    for (const target of trainer.legalTargets) {
      const isCapture = !!game.get(target as Square);
      styles[target] = {
        ...styles[target],
        ...(isCapture ? captureDotStyle : moveDotStyle),
      };
    }
    if (showHint && trainer.hintMove) {
      styles[trainer.hintMove.from] = {
        ...styles[trainer.hintMove.from],
        boxShadow: 'inset 0 0 0 3px rgba(232,184,109,0.8)',
      };
      styles[trainer.hintMove.to] = {
        ...styles[trainer.hintMove.to],
        boxShadow: 'inset 0 0 0 3px rgba(232,184,109,0.8)',
      };
    }
    return styles;
  }, [
    trainer.lastMove,
    trainer.selected,
    trainer.legalTargets,
    trainer.fen,
    trainer.hintMove,
    showHint,
  ]);

  const hintArrows = useMemo(() => {
    if (showHint && trainer.hintMove) {
      return [[trainer.hintMove.from, trainer.hintMove.to, '#E8B86D']] as [
        Square,
        Square,
        string,
      ][];
    }
    return [] as [Square, Square, string][];
  }, [showHint, trainer.hintMove]);

  function onPieceDrop(from: Square, to: Square): boolean {
    return trainer.attemptMove(from, to);
  }

  function onSquareClick(square: Square) {
    trainer.selectSquare(square);
  }

  function handleHint() {
    if (!trainer.hintSan) return;
    setShowHint(true);
    notify(`Hint: play ${trainer.hintSan}`, 'info');
  }

  function handleFlip() {
    setOrientation((o) => (o === 'white' ? 'black' : 'white'));
  }

  function handleFinishGame() {
    if (engineStatus !== 'ready') {
      notify('The engine is offline — game finishing is unavailable.', 'danger');
      return;
    }
    trainer.startFreePlay(getDifficulty(difficultyId));
  }

  const progressPct =
    trainer.phase === 'learning'
      ? Math.round((trainer.currentStep / trainer.totalSteps) * 100)
      : 100;

  const activeMoveIndex = trainer.history.length - 1;

  return (
    <div className="mx-auto max-w-shell px-4 py-8 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/"
            className="font-mono text-xs text-content-muted transition-colors hover:text-content"
          >
            &larr; All openings
          </Link>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tightish text-content">
            {opening.name}
          </h1>
          {variations.length > 1 && (
            <p className="mt-1 text-sm text-content-muted">
              <span className="text-accent">{activeVar.name}</span>
              {randomMode && (
                <span className="ml-2 font-mono text-xs text-content-muted">
                  · random
                </span>
              )}
            </p>
          )}
        </div>
        <EngineBadge status={engineStatus} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* BOARD */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[560px] rounded-2xl border border-border/60 bg-raised p-3 shadow-board">
            <Chessboard
              position={trainer.fen}
              onPieceDrop={onPieceDrop}
              onSquareClick={onSquareClick}
              boardOrientation={orientation}
              arePiecesDraggable={trainer.isPlayerTurn}
              customBoardStyle={boardStyle}
              customLightSquareStyle={lightSquareStyle}
              customDarkSquareStyle={darkSquareStyle}
              customSquareStyles={squareStyles}
              customArrows={hintArrows}
              animationDuration={250}
            />
          </div>

          {/* TURN / STATUS LINE */}
          <div className="mt-4 flex h-6 items-center gap-2 text-sm">
            {trainer.opponentThinking ? (
              <span className="flex items-center gap-2 text-content-muted">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                {trainer.phase === 'freeplay'
                  ? 'Engine is thinking…'
                  : 'Opponent is moving…'}
              </span>
            ) : trainer.isPlayerTurn ? (
              <span className="text-content-muted">
                Your move
                {trainer.phase === 'learning' && ' — play the opening line'}
              </span>
            ) : trainer.phase === 'complete' ? (
              <span className="font-medium text-success">Line complete</span>
            ) : trainer.phase === 'gameover' ? (
              <span className="font-medium text-accent">Game over</span>
            ) : null}
          </div>

          {/* BOARD CONTROLS — kept directly under the board so they're reachable
              without scrolling, especially on mobile */}
          <div className="mt-3 w-full max-w-[560px] space-y-2">
            {trainer.phase === 'complete' && (
              <>
                {engineStatus === 'ready' && (
                  <div className="rounded-xl border border-border/60 bg-raised/60 p-3">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-content-subtle">
                      Opponent strength
                    </p>
                    <DifficultySelect
                      value={difficultyId}
                      onChange={setDifficultyId}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleFinishGame}
                  disabled={engineStatus !== 'ready'}
                  className="btn-primary w-full"
                >
                  {engineStatus === 'loading'
                    ? 'Loading engine…'
                    : engineStatus === 'offline'
                      ? 'Engine offline'
                      : 'Finish the game vs Stockfish'}
                </button>
                {engineStatus === 'offline' && (
                  <p className="text-center text-xs text-danger">
                    The engine could not load, so game-finish is unavailable. The
                    lesson still works fully.
                  </p>
                )}
              </>
            )}
            <div className="flex items-center gap-2">
              {trainer.phase === 'learning' && (
                <button
                  type="button"
                  onClick={handleHint}
                  disabled={!trainer.isPlayerTurn || !trainer.hintSan}
                  className="btn-ghost flex-1"
                >
                  Hint
                </button>
              )}
              <button
                type="button"
                onClick={handleFlip}
                className="btn-ghost flex-1"
              >
                Flip
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="btn-ghost flex-1"
              >
                Restart
              </button>
            </div>
          </div>
        </div>

        {/* SIDE PANEL */}
        <aside className="flex flex-col gap-4">
          {/* VARIATION PICKER */}
          {variations.length > 1 && (
            <div className="card-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-content-muted">
                  Variation
                </span>
                <button
                  type="button"
                  onClick={pickRandom}
                  className={[
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    randomMode
                      ? 'border-accent bg-accent/15 text-accent'
                      : 'border-border text-content-muted hover:border-accent/60 hover:text-content',
                  ].join(' ')}
                >
                  🎲 Random
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {variations.map((v) => {
                  const active = !randomMode && v.id === variationId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => selectVariation(v.id)}
                      title={v.trigger}
                      className={[
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        active
                          ? 'border-primary bg-primary/15 text-content'
                          : 'border-border text-content-muted hover:border-primary/60 hover:text-content',
                      ].join(' ')}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
              {activeVar.trigger && (
                <p className="mt-3 text-xs leading-relaxed text-content-muted">
                  {activeVar.trigger}
                </p>
              )}
            </div>
          )}

          <div className="card-surface divide-y divide-border/70">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-content-muted">ECO</span>
                <span className="rounded-md border border-border bg-raised px-2 py-0.5 font-mono text-xs text-accent">
                  {opening.eco}
                </span>
              </div>
              <span className="font-mono text-xs capitalize text-content-muted">
                You play {opening.side}
              </span>
            </div>

            {/* Progress */}
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-mono text-content-muted">
                  {trainer.phase === 'learning'
                    ? `Move ${Math.min(
                        trainer.currentStep + 1,
                        trainer.totalSteps,
                      )} of ${trainer.totalSteps}`
                    : trainer.phase === 'complete'
                      ? 'Line mastered'
                      : 'Free play'}
                </span>
                {trainer.phase !== 'learning' && (
                  <span className="text-success">✓</span>
                )}
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={[
                    'h-full rounded-full transition-all duration-500 ease-smooth',
                    trainer.phase === 'learning' ? 'bg-primary' : 'bg-success',
                  ].join(' ')}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Move list */}
            <MoveList history={trainer.history} activeIndex={activeMoveIndex} />

            {/* Coaching panel */}
            <CoachingPanel
              coaching={trainer.coaching}
              feedbackKind={trainer.feedback.kind}
              feedbackNonce={trainer.feedback.nonce}
              feedbackMessage={trainer.feedback.message}
            />
          </div>

          {/* Complete / celebrate */}
          {trainer.phase === 'complete' && (
            <div className="animate-fade-up rounded-xl border border-success/40 bg-success/10 p-4">
              <p className="font-display text-lg font-semibold text-success">
                Line complete!
              </p>
              <p className="mt-1 text-sm text-content-muted">
                You played the full {opening.name}. Use the controls under the
                board to finish the game against a beginner-strength engine, or
                replay the line.
              </p>
            </div>
          )}

          {/* Game over result */}
          {trainer.phase === 'gameover' && trainer.result && (
            <div className="animate-fade-up rounded-xl border border-accent/40 bg-accent/10 p-4">
              <p className="font-display text-lg font-semibold text-accent">
                Game over
              </p>
              <p className="mt-1 text-sm text-content">{trainer.result}</p>
            </div>
          )}

          <KeyIdeas ideas={opening.keyIdeas} />
        </aside>
      </div>
    </div>
  );
}

function CoachingPanel({
  coaching,
  feedbackKind,
  feedbackNonce,
  feedbackMessage,
}: {
  coaching: string;
  feedbackKind: string;
  feedbackNonce: number;
  feedbackMessage: string;
}) {
  return (
    <div className="border-l-2 border-accent/50 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-sm text-accent">
          C
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-content-subtle">
            Coach
          </p>
          <p className="mt-1 text-sm leading-relaxed text-content">{coaching}</p>
          {feedbackKind === 'correct' && (
            <p
              key={feedbackNonce}
              className="mt-2 animate-fade-up text-sm font-medium text-success"
            >
              ✓ {feedbackMessage}
            </p>
          )}
          {feedbackKind === 'wrong' && (
            <p
              key={feedbackNonce}
              className="mt-2 animate-shake rounded-md bg-danger/10 px-2 py-1 text-sm font-medium text-danger"
            >
              {feedbackMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function KeyIdeas({ ideas }: { ideas: string[] }) {
  return (
    <div className="card-surface p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-content-subtle">
        Key ideas
      </p>
      <ul className="flex flex-col gap-2">
        {ideas.map((idea) => (
          <li key={idea} className="flex gap-2 text-sm text-content-muted">
            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent" />
            <span>{idea}</span>
          </li>
        ))}
      </ul>
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
