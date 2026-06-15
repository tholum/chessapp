/**
 * Difficulty ladder for the computer opponent, expressed in *estimated* ELO.
 *
 * Stockfish's own UCI_Elo floor is ~1350, far above a true beginner. To model
 * weaker play we combine a low Skill Level + shallow depth with `randomness`:
 * the fraction of moves where we ignore the engine and play a random legal move
 * instead. High randomness ≈ a beginner who hangs pieces; zero randomness =
 * pure (capped) engine. The ELO figures are approximate guides, not exact.
 */
export interface DifficultyLevel {
  id: string;
  label: string;
  /** Estimated ELO, shown to the user. Approximate. */
  elo: number;
  /** Stockfish "Skill Level", 0 (weakest) .. 20 (full strength). */
  skill: number;
  /** Search depth in plies. */
  depth: number;
  /** Probability [0..1] of playing a random legal move instead of the engine's. */
  randomness: number;
  /** One-line description of how this opponent feels to play. */
  blurb: string;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    elo: 300,
    skill: 0,
    depth: 1,
    randomness: 0.8,
    blurb: 'Plays mostly random moves and hangs pieces — perfect for your very first games.',
  },
  {
    id: 'novice',
    label: 'Novice',
    elo: 600,
    skill: 0,
    depth: 2,
    randomness: 0.55,
    blurb: 'Knows how the pieces move but blunders often.',
  },
  {
    id: 'casual',
    label: 'Casual',
    elo: 900,
    skill: 1,
    depth: 3,
    randomness: 0.32,
    blurb: 'Has a basic plan, still very forgiving of your mistakes.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    elo: 1200,
    skill: 3,
    depth: 5,
    randomness: 0.15,
    blurb: 'Develops sensibly and punishes simple blunders.',
  },
  {
    id: 'skilled',
    label: 'Skilled',
    elo: 1500,
    skill: 6,
    depth: 7,
    randomness: 0.05,
    blurb: 'Solid club-player strength — you will need a plan.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    elo: 1800,
    skill: 11,
    depth: 9,
    randomness: 0,
    blurb: 'Strong and tactical. Few free gifts here.',
  },
  {
    id: 'expert',
    label: 'Expert',
    elo: 2200,
    skill: 20,
    depth: 13,
    randomness: 0,
    blurb: 'Full-strength capped search. Good luck.',
  },
];

/** The default opponent strength: a true beginner (~300 ELO). */
export const DEFAULT_DIFFICULTY_ID = 'beginner';
export const DEFAULT_DIFFICULTY: DifficultyLevel = DIFFICULTY_LEVELS[0];

/** Resolve a level by id, falling back to the default (~300 ELO). */
export function getDifficulty(id: string | undefined): DifficultyLevel {
  return DIFFICULTY_LEVELS.find((l) => l.id === id) ?? DEFAULT_DIFFICULTY;
}
