import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import type { Square } from 'chess.js';
import type { OpeningStep } from '../types';
import { getBestMoveSafe } from '../engine/stockfish';

/**
 * One trainable line, independent of how it was selected. The Lesson page picks
 * a variation (specific or random) and feeds it here. `key` must be unique per
 * (opening, variation) so the trainer resets when the selection changes.
 */
export interface TrainingLine {
  key: string;
  side: 'white' | 'black';
  name: string;
  steps: OpeningStep[];
}

export type TrainerPhase = 'learning' | 'complete' | 'freeplay' | 'gameover';

export type FeedbackKind = 'idle' | 'correct' | 'wrong' | 'info';

export interface Feedback {
  kind: FeedbackKind;
  message: string;
  /** Bumped on every set so the UI can re-trigger animations. */
  nonce: number;
}

export interface PlayedMove {
  san: string;
  /** Step index in the opening, or -1 once we are in free play. */
  stepIndex: number;
}

interface LastMove {
  from: Square;
  to: Square;
}

export interface TrainerState {
  fen: string;
  phase: TrainerPhase;
  /** Index of the next step the learner/opponent must play (0-based). */
  currentStep: number;
  totalSteps: number;
  /** Half-moves played so far, with SAN (for the move list). */
  history: PlayedMove[];
  /** Explanation shown in the coaching panel for the most recent learner move. */
  coaching: string;
  feedback: Feedback;
  lastMove: LastMove | null;
  /** Square the player has selected (for click-to-move + highlights). */
  selected: Square | null;
  /** Target squares for the selected piece. */
  legalTargets: Square[];
  boardOrientation: 'white' | 'black';
  /** True while the opponent (scripted or engine) is thinking/moving. */
  opponentThinking: boolean;
  /** Set when the game vs engine ends. */
  result: string | null;
  /** True if it is currently the learner's turn to move on the board. */
  isPlayerTurn: boolean;
}

const STARTING_COACHING =
  'Play the highlighted opening line one move at a time. Make the move on the board when it is your turn — I will explain the idea behind each one.';

export interface TrainerApi extends TrainerState {
  /** Attempt a move (from/to, with optional promotion). Returns true if accepted. */
  attemptMove: (from: Square, to: Square, promotion?: string) => boolean;
  selectSquare: (square: Square | null) => void;
  reset: () => void;
  startFreePlay: () => void;
  /** The expected next learner move's SAN, for the Hint button (learning only). */
  hintSan: string | null;
  /** from/to of the hint move, for drawing an arrow. */
  hintMove: LastMove | null;
}

/**
 * The trainer state machine. chess.js is the single source of truth.
 *
 *  - In "learning" phase the app auto-plays opponent steps and waits for the
 *    learner to play the correct SAN for their steps.
 *  - When all steps are done we enter "complete".
 *  - startFreePlay() switches to "freeplay": the learner makes legal moves and
 *    Stockfish (beginner strength) answers, until the game ends ("gameover").
 */
export function useTrainer(line: TrainingLine): TrainerApi {
  const learnerColor = line.side === 'white' ? 'w' : 'b';
  const orientation = line.side;

  const gameRef = useRef(new Chess());
  const [version, setVersion] = useState(0); // bump to force re-render from ref
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<TrainerPhase>('learning');
  const [history, setHistory] = useState<PlayedMove[]>([]);
  const [coaching, setCoaching] = useState(STARTING_COACHING);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: 'idle',
    message: '',
    nonce: 0,
  });
  const [lastMove, setLastMove] = useState<LastMove | null>(null);
  const [selected, setSelected] = useState<Square | null>(null);
  const [opponentThinking, setOpponentThinking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const feedbackNonce = useRef(0);

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const setFb = useCallback((kind: FeedbackKind, message: string) => {
    feedbackNonce.current += 1;
    setFeedback({ kind, message, nonce: feedbackNonce.current });
  }, []);

  const reset = useCallback(() => {
    gameRef.current = new Chess();
    setCurrentStep(0);
    setPhase('learning');
    setHistory([]);
    setCoaching(STARTING_COACHING);
    setLastMove(null);
    setSelected(null);
    setOpponentThinking(false);
    setResult(null);
    feedbackNonce.current += 1;
    setFeedback({ kind: 'idle', message: '', nonce: feedbackNonce.current });
    bump();
  }, [bump]);

  // Reset whenever the opening changes.
  useEffect(() => {
    reset();
  }, [line.key, reset]);

  // Whose turn is it according to the engine of truth?
  const turnColor = gameRef.current.turn();
  const isLearnerStep =
    phase === 'learning' &&
    currentStep < line.steps.length &&
    turnColor === learnerColor;

  // Auto-play opponent (scripted) steps during the learning phase.
  useEffect(() => {
    if (phase !== 'learning') return;
    if (currentStep >= line.steps.length) {
      setPhase('complete');
      setCoaching(
        `Beautiful — you played the entire ${line.name} line. You can replay it, try another variation, or test yourself by finishing the game against the engine.`,
      );
      return;
    }
    const expected = line.steps[currentStep];
    const turn = gameRef.current.turn();
    if (turn === learnerColor) return; // wait for the human

    // It's the opponent's scripted move — play it after a short beat.
    setOpponentThinking(true);
    const timer = window.setTimeout(() => {
      const game = gameRef.current;
      try {
        const mv = game.move(expected.san);
        setLastMove({ from: mv.from, to: mv.to });
        setHistory((h) => [...h, { san: mv.san, stepIndex: currentStep }]);
      } catch {
        // Should never happen with valid curriculum data.
        setOpponentThinking(false);
        return;
      }
      setOpponentThinking(false);
      setCurrentStep((s) => s + 1);
      bump();
    }, 550);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentStep, version, line.key, learnerColor]);

  const finishGame = useCallback(() => {
    const game = gameRef.current;
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
    setPhase('gameover');
    setCoaching(message);
  }, [learnerColor]);

  // Engine replies during free play.
  useEffect(() => {
    if (phase !== 'freeplay') return;
    const game = gameRef.current;
    if (game.isGameOver()) {
      finishGame();
      return;
    }
    if (game.turn() === learnerColor) return; // human's turn

    let cancelled = false;
    setOpponentThinking(true);
    (async () => {
      const uci = await getBestMoveSafe(game.fen(), { depth: 8, skill: 3 });
      if (cancelled) return;
      if (!uci || uci === '(none)') {
        setOpponentThinking(false);
        setFb('info', 'The engine could not move — finishing here.');
        finishGame();
        return;
      }
      try {
        const from = uci.slice(0, 2) as Square;
        const to = uci.slice(2, 4) as Square;
        const promotion = uci.length > 4 ? uci.slice(4, 5) : undefined;
        const mv = game.move({ from, to, promotion });
        setLastMove({ from: mv.from, to: mv.to });
        setHistory((h) => [...h, { san: mv.san, stepIndex: -1 }]);
      } catch {
        setFb('info', 'The engine returned an illegal move — finishing here.');
        finishGame();
      }
      setOpponentThinking(false);
      bump();
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, version, learnerColor]);

  const legalTargets = useMemo<Square[]>(() => {
    if (!selected) return [];
    const moves = gameRef.current.moves({ square: selected, verbose: true });
    return moves.map((m) => m.to as Square);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, version]);

  const isPlayerTurn =
    !opponentThinking &&
    ((phase === 'learning' && isLearnerStep) ||
      (phase === 'freeplay' && turnColor === learnerColor));

  const attemptMove = useCallback(
    (from: Square, to: Square, promotion = 'q'): boolean => {
      const game = gameRef.current;

      // FREE PLAY: any legal move is accepted.
      if (phase === 'freeplay') {
        if (game.turn() !== learnerColor || opponentThinking) return false;
        try {
          const mv = game.move({ from, to, promotion });
          setLastMove({ from: mv.from, to: mv.to });
          setHistory((h) => [...h, { san: mv.san, stepIndex: -1 }]);
          setSelected(null);
          bump();
          return true;
        } catch {
          setFb('wrong', 'That is not a legal move.');
          return false;
        }
      }

      // LEARNING: must match the scripted SAN for this step.
      if (phase !== 'learning' || !isLearnerStep) return false;

      const expected = line.steps[currentStep];

      // Validate legality first (so we can produce a real move to compare SAN).
      let mv;
      try {
        mv = game.move({ from, to, promotion });
      } catch {
        setFb('wrong', 'That move is not legal here. Try again.');
        return false;
      }

      // Compare against the expected SAN (normalize check/mate symbols).
      const norm = (s: string) => s.replace(/[+#]/g, '');
      if (norm(mv.san) !== norm(expected.san)) {
        game.undo(); // roll back the wrong move
        setFb(
          'wrong',
          `Not quite — that is not the ${line.name} move here. Take another look.`,
        );
        setSelected(null);
        return false;
      }

      // Correct!
      setLastMove({ from: mv.from, to: mv.to });
      setHistory((h) => [...h, { san: mv.san, stepIndex: currentStep }]);
      setCoaching(expected.explanation);
      setFb('correct', 'Correct!');
      setSelected(null);
      setCurrentStep((s) => s + 1);
      bump();
      return true;
    },
    [
      phase,
      isLearnerStep,
      currentStep,
      line.steps,
      line.name,
      learnerColor,
      opponentThinking,
      setFb,
      bump,
    ],
  );

  const selectSquare = useCallback(
    (square: Square | null) => {
      if (!isPlayerTurn) {
        setSelected(null);
        return;
      }
      if (square === null) {
        setSelected(null);
        return;
      }
      const game = gameRef.current;
      // If a piece is already selected and this is a legal target, move there.
      if (selected && selected !== square) {
        const targets = game
          .moves({ square: selected, verbose: true })
          .map((m) => m.to);
        if (targets.includes(square)) {
          attemptMove(selected, square);
          return;
        }
      }
      // Otherwise (re)select if this square has a movable piece.
      const piece = game.get(square);
      if (piece && piece.color === learnerColor) {
        setSelected(square);
      } else {
        setSelected(null);
      }
    },
    [isPlayerTurn, selected, attemptMove, learnerColor],
  );

  const startFreePlay = useCallback(() => {
    setPhase('freeplay');
    setSelected(null);
    setCoaching(
      'Free play! Keep making sensible moves — develop, stay safe, and look for tactics. I will answer with the engine until the game ends.',
    );
    feedbackNonce.current += 1;
    setFeedback({
      kind: 'info',
      message: 'Playing on against the engine.',
      nonce: feedbackNonce.current,
    });
    bump();
  }, [bump]);

  const hintSan =
    phase === 'learning' && isLearnerStep
      ? line.steps[currentStep].san
      : null;

  const hintMove = useMemo<LastMove | null>(() => {
    if (!hintSan) return null;
    // Probe the move on a clone to get from/to without mutating state.
    const probe = new Chess(gameRef.current.fen());
    try {
      const mv = probe.move(hintSan);
      return { from: mv.from, to: mv.to };
    } catch {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hintSan, version]);

  return {
    fen: gameRef.current.fen(),
    phase,
    currentStep,
    totalSteps: line.steps.length,
    history,
    coaching,
    feedback,
    lastMove,
    selected,
    legalTargets,
    boardOrientation: orientation,
    opponentThinking,
    result,
    isPlayerTurn,
    attemptMove,
    selectSquare,
    reset,
    startFreePlay,
    hintSan,
    hintMove,
  };
}
