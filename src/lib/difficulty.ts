/**
 * Difficulty ladder for the computer opponent, expressed in *estimated* ELO.
 *
 * Rather than crippling Stockfish (which makes ugly, alien moves), we let it
 * evaluate honestly and return its top `multipv` candidate moves, then SAMPLE
 * among them with a softmax weighted by evaluation. `temperature` (in
 * centipawns) controls how loosely we sample: low temperature ≈ always the best
 * move (strong), high temperature ≈ often a worse-but-still-plausible move
 * (weak, human-like). `blunderChance` adds the occasional outright howler (a
 * random legal move) the way real beginners do.
 *
 * This produces natural, weak play — capturing, developing, sometimes hanging a
 * piece — instead of random shuffling. The ELO figures remain approximate
 * guides, not calibrated ratings.
 */
export interface DifficultyLevel {
  id: string;
  label: string;
  /** Estimated ELO, shown to the user. Approximate. */
  elo: number;
  /** Search depth in plies (also caps the ceiling strength). */
  depth: number;
  /** How many candidate moves to consider when sampling. */
  multipv: number;
  /** Softmax temperature in centipawns. Higher = weaker/looser. 0 = always best. */
  temperature: number;
  /** Probability [0..1] of an outright random "howler" move. */
  blunderChance: number;
  /** One-line description of how this opponent feels to play. */
  blurb: string;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    elo: 300,
    depth: 4,
    multipv: 10,
    temperature: 400,
    blunderChance: 0.45,
    blurb: 'A true novice: makes natural-looking moves but hangs pieces and misses threats often.',
  },
  {
    id: 'novice',
    label: 'Novice',
    elo: 600,
    depth: 5,
    multipv: 8,
    temperature: 380,
    blunderChance: 0.26,
    blurb: 'Develops pieces and grabs material, but still blunders regularly.',
  },
  {
    id: 'casual',
    label: 'Casual',
    elo: 900,
    depth: 6,
    multipv: 6,
    temperature: 230,
    blunderChance: 0.13,
    blurb: 'Has a plan and punishes obvious mistakes — forgiving but not free.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    elo: 1200,
    depth: 8,
    multipv: 6,
    temperature: 165,
    blunderChance: 0.05,
    blurb: 'Solid moves, spots simple tactics. You need a real plan now.',
  },
  {
    id: 'skilled',
    label: 'Skilled',
    elo: 1500,
    depth: 10,
    multipv: 6,
    temperature: 105,
    blunderChance: 0.01,
    blurb: 'Club-player strength — consistent and tactically alert.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    elo: 1800,
    depth: 12,
    multipv: 4,
    temperature: 40,
    blunderChance: 0,
    blurb: 'Strong and precise. Few free gifts here.',
  },
  {
    id: 'expert',
    label: 'Expert',
    elo: 2200,
    depth: 15,
    multipv: 1,
    temperature: 0,
    blunderChance: 0,
    blurb: 'Plays the engine’s best move every time. Good luck.',
  },
];

/** The default opponent strength: a true beginner (~300 ELO). */
export const DEFAULT_DIFFICULTY_ID = 'beginner';
export const DEFAULT_DIFFICULTY: DifficultyLevel = DIFFICULTY_LEVELS[0];

/** Resolve a level by id, falling back to the default (~300 ELO). */
export function getDifficulty(id: string | undefined): DifficultyLevel {
  return DIFFICULTY_LEVELS.find((l) => l.id === id) ?? DEFAULT_DIFFICULTY;
}
