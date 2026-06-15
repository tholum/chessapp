/**
 * Core data model for the chess-opening trainer.
 *
 * Other agents adding openings MUST conform to these types. Each opening is a
 * linear "main line" of SAN moves with a beginner-friendly explanation per move.
 */

/** A single half-move in an opening line, in SAN, with coaching copy. */
export interface OpeningStep {
  /** Standard Algebraic Notation for this move, e.g. "Nf3", "O-O", "exd5". */
  san: string;
  /** Beginner-friendly explanation of why this move is played. */
  explanation: string;
}

/** A complete, learnable opening line. */
export interface Opening {
  /** URL-safe unique id, e.g. "italian-game". Used in the route /learn/:id. */
  id: string;
  /** Display name, e.g. "Italian Game". */
  name: string;
  /** ECO classification code, e.g. "C50". */
  eco: string;
  /** Which side the learner plays. The other side is auto-played by the app. */
  side: 'white' | 'black';
  /** One-paragraph overview of the opening. */
  summary: string;
  /** Why this opening is good for beginners. */
  whyBeginner: string;
  /** Bullet-point strategic takeaways. */
  keyIdeas: string[];
  /**
   * The main line, in order, starting from the initial position. Steps
   * alternate sides (White, Black, White, ...). Every SAN must be legal in the
   * position produced by replaying all previous steps.
   */
  steps: OpeningStep[];
}
