import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import type { Square } from 'chess.js';
import { getEngineMove } from './engineMove';
import type { DifficultyLevel } from './difficulty';

export type PlayerColor = 'white' | 'black';

interface LastMove {
  from: Square;
  to: Square;
}

export interface PlayGameApi {
  /** Current position FEN — chess.js is the single source of truth. */
  fen: string;
  /** Which side the board is shown from / the human plays. */
  boardOrientation: PlayerColor;
  /** Whose turn it is to move ('white' | 'black'). */
  turn: PlayerColor;
  /** True when it is the human's turn and the engine isn't thinking. */
  isPlayerTurn: boolean;
  /** Half-move SAN list for the move list. */
  history: string[];
  /** from/to of the most recent move, for highlighting. */
  lastMove: LastMove | null;
  /** Square the player has selected (click-to-move). */
  selected: Square | null;
  /** Legal target squares for the selected piece (move dots). */
  legalTargets: Square[];
  /** True while the engine is computing its reply. */
  thinking: boolean;
  /** Result message once the game is over, else null. */
  result: string | null;
  isGameOver: boolean;
  /** Attempt a move; returns true if it was legal and applied. */
  attemptMove: (from: Square, to: Square, promotion?: string) => boolean;
  /** Click-to-move selection handler. */
  selectSquare: (square: Square | null) => void;
  /** Start a fresh game with the current color + level. */
  newGame: () => void;
  /** Resign the current game (player loses). */
  resign: () => void;
}

/**
 * A self-contained "play a full game vs Stockfish" hook. chess.js is the single
 * source of truth (held in a ref); a version counter forces re-renders. Modeled
 * on useTrainer's free-play loop: the engine replies whenever it's its turn, the
 * player moves by click-to-move or drag, and the game ends on checkmate /
 * stalemate / draw or resignation.
 */
export function usePlayGame(
  playerColor: PlayerColor,
  level: DifficultyLevel,
): PlayGameApi {
  const gameRef = useRef(new Chess());
  const [version, setVersion] = useState(0); // bump to re-render from the ref
  const [history, setHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<LastMove | null>(null);
  const [selected, setSelected] = useState<Square | null>(null);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // The active game's color + level are captured at newGame() time so changing
  // the pickers mid-game doesn't disturb the running game.
  const activeColor = useRef(playerColor);
  const activeLevel = useRef(level);
  // Each new game gets a token; in-flight engine replies for stale games abort.
  const gameToken = useRef(0);

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const finishGame = useCallback(() => {
    const game = gameRef.current;
    const learnerColor = activeColor.current === 'white' ? 'w' : 'b';
    let message: string;
    if (game.isCheckmate()) {
      const loser = game.turn();
      const learnerWon = loser !== learnerColor;
      message = learnerWon
        ? 'Checkmate — you won! Brilliantly finished.'
        : 'Checkmate — the engine got you this time. Try again!';
    } else if (game.isStalemate()) {
      message = 'Stalemate — a draw. No legal moves, but no check.';
    } else if (game.isThreefoldRepetition()) {
      message = 'Draw by threefold repetition.';
    } else if (game.isInsufficientMaterial()) {
      message = 'Draw — insufficient material to checkmate.';
    } else if (game.isDraw()) {
      message = 'Draw (50-move rule or no progress).';
    } else {
      message = 'Game over.';
    }
    setResult(message);
  }, []);

  const newGame = useCallback(() => {
    gameToken.current += 1;
    activeColor.current = playerColor;
    activeLevel.current = level;
    gameRef.current = new Chess();
    setHistory([]);
    setLastMove(null);
    setSelected(null);
    setThinking(false);
    setResult(null);
    bump();
  }, [playerColor, level, bump]);

  // Start a fresh game on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTurnColor = activeColor.current === 'white' ? 'w' : 'b';
  const turnColor = gameRef.current.turn();

  // Engine replies whenever it's the engine's turn and the game isn't over.
  useEffect(() => {
    if (result) return;
    const game = gameRef.current;
    if (game.isGameOver()) {
      finishGame();
      return;
    }
    if (game.turn() === activeTurnColor) return; // human's turn

    const token = gameToken.current;
    let cancelled = false;
    setThinking(true);
    (async () => {
      const uci = await getEngineMove(game.fen(), activeLevel.current);
      if (cancelled || token !== gameToken.current) return;
      if (!uci || uci === '(none)') {
        setThinking(false);
        finishGame();
        return;
      }
      try {
        const from = uci.slice(0, 2) as Square;
        const to = uci.slice(2, 4) as Square;
        const promotion = uci.length > 4 ? uci.slice(4, 5) : undefined;
        const mv = game.move({ from, to, promotion });
        setLastMove({ from: mv.from, to: mv.to });
        setHistory((h) => [...h, mv.san]);
      } catch {
        setThinking(false);
        finishGame();
        return;
      }
      setThinking(false);
      bump();
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, result]);

  const legalTargets = useMemo<Square[]>(() => {
    if (!selected) return [];
    const moves = gameRef.current.moves({ square: selected, verbose: true });
    return moves.map((m) => m.to as Square);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, version]);

  const isPlayerTurn =
    !thinking && !result && turnColor === activeTurnColor;

  const attemptMove = useCallback(
    (from: Square, to: Square, promotion = 'q'): boolean => {
      const game = gameRef.current;
      if (result || thinking) return false;
      if (game.turn() !== activeTurnColor) return false;
      try {
        const mv = game.move({ from, to, promotion });
        setLastMove({ from: mv.from, to: mv.to });
        setHistory((h) => [...h, mv.san]);
        setSelected(null);
        bump();
        return true;
      } catch {
        return false;
      }
    },
    [result, thinking, activeTurnColor, bump],
  );

  const selectSquare = useCallback(
    (square: Square | null) => {
      if (!isPlayerTurn || square === null) {
        setSelected(null);
        return;
      }
      const game = gameRef.current;
      // If a piece is selected and this is a legal target, move there.
      if (selected && selected !== square) {
        const targets = game
          .moves({ square: selected, verbose: true })
          .map((m) => m.to);
        if (targets.includes(square)) {
          attemptMove(selected, square);
          return;
        }
      }
      // Otherwise (re)select if this square has one of the player's pieces.
      const piece = game.get(square);
      if (piece && piece.color === activeTurnColor) {
        setSelected(square);
      } else {
        setSelected(null);
      }
    },
    [isPlayerTurn, selected, attemptMove, activeTurnColor],
  );

  const resign = useCallback(() => {
    if (result || gameRef.current.isGameOver()) return;
    setThinking(false);
    setSelected(null);
    gameToken.current += 1; // abort any in-flight engine reply
    setResult('You resigned — the engine wins this one. Try again!');
  }, [result]);

  return {
    fen: gameRef.current.fen(),
    boardOrientation: activeColor.current,
    turn: turnColor === 'w' ? 'white' : 'black',
    isPlayerTurn,
    history,
    lastMove,
    selected,
    legalTargets,
    thinking,
    result,
    isGameOver: result !== null || gameRef.current.isGameOver(),
    attemptMove,
    selectSquare,
    newGame,
    resign,
  };
}
