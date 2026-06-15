/**
 * Picks the computer's move for a given difficulty. For weak levels it plays a
 * random legal move some fraction of the time (see DifficultyLevel.randomness);
 * otherwise it asks Stockfish with that level's skill + depth. Returns a UCI
 * move string ("e2e4", "e7e8q"), "(none)" if the side to move has no move, or
 * null if the engine is offline.
 */
import { Chess } from 'chess.js';
import { getBestMoveSafe } from '../engine/stockfish';
import type { DifficultyLevel } from './difficulty';

/** A uniformly random legal move in UCI form, or null if none exist. */
export function randomLegalUci(fen: string): string | null {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  const m = moves[Math.floor(Math.random() * moves.length)];
  return `${m.from}${m.to}${m.promotion ?? ''}`;
}

export async function getEngineMove(
  fen: string,
  level: DifficultyLevel,
): Promise<string | null> {
  if (level.randomness > 0 && Math.random() < level.randomness) {
    const random = randomLegalUci(fen);
    if (random) return random;
  }
  return getBestMoveSafe(fen, { skill: level.skill, depth: level.depth });
}
