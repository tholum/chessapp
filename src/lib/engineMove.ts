/**
 * Picks the computer's move for a given difficulty by sampling among Stockfish's
 * top candidate moves (MultiPV) with an evaluation-weighted softmax. Low levels
 * use a high temperature (loose, often suboptimal-but-plausible moves) plus an
 * occasional random "howler"; high levels collapse to the engine's best move.
 *
 * Returns a UCI move ("e2e4"/"e7e8q"), "(none)" if the side to move has no move,
 * or null if the engine is offline.
 */
import { Chess } from 'chess.js';
import { getTopMovesSafe, type ScoredMove } from '../engine/stockfish';
import type { DifficultyLevel } from './difficulty';

/** A uniformly random legal move in UCI form, or null if none exist. */
export function randomLegalUci(fen: string): string | null {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  const m = moves[Math.floor(Math.random() * moves.length)];
  return `${m.from}${m.to}${m.promotion ?? ''}`;
}

/**
 * Sample one move from scored candidates using softmax over score/temperature.
 * Scores are clamped to ±1000cp so a forced mate doesn't dominate the weights
 * (we still *usually* pick it, but a weak bot can miss it). Best-first input.
 */
export function sampleByTemperature(
  candidates: ScoredMove[],
  temperature: number,
): string {
  if (candidates.length === 1 || temperature <= 0) return candidates[0].move;

  const scores = candidates.map((c) =>
    Math.max(-1000, Math.min(1000, c.scoreCp)),
  );
  const max = Math.max(...scores);
  const weights = scores.map((s) => Math.exp((s - max) / temperature));
  const total = weights.reduce((a, b) => a + b, 0);

  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i].move;
  }
  return candidates[candidates.length - 1].move;
}

export async function getEngineMove(
  fen: string,
  level: DifficultyLevel,
): Promise<string | null> {
  // Occasional outright howler, the way a real beginner blunders.
  if (level.blunderChance > 0 && Math.random() < level.blunderChance) {
    const random = randomLegalUci(fen);
    if (random) return random;
  }

  const candidates = await getTopMovesSafe(fen, {
    depth: level.depth,
    multipv: level.multipv,
  });

  if (candidates === null) return null; // engine offline
  if (candidates.length === 0) return '(none)'; // no legal move (mate/stalemate)

  return sampleByTemperature(candidates, level.temperature);
}
