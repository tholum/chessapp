/**
 * Core data model for the chess-opening trainer.
 *
 * An opening is taught as one or more *variations*. Each variation is a linear
 * line of SAN moves (with a beginner-friendly explanation per move) capturing
 * one way the opening can go — e.g. the main line, or "if Black plays the
 * Two Knights Defense". On the lesson page the learner can pick a specific
 * variation or train a random one.
 */

/** A single half-move in a line, in SAN, with coaching copy. */
export interface OpeningStep {
  /** Standard Algebraic Notation for this move, e.g. "Nf3", "O-O", "exd5". */
  san: string;
  /** Beginner-friendly explanation of why this move is played. */
  explanation: string;
}

/** One concrete line through an opening (main line or a named variation). */
export interface Variation {
  /** id, unique within the opening, e.g. "main", "two-knights". */
  id: string;
  /** Display name, e.g. "Main Line", "Two Knights Defense". */
  name: string;
  /**
   * Short note on what makes this branch happen — typically the opponent's
   * choice, e.g. "If Black challenges the center with ...d5". Optional.
   */
  trigger?: string;
  /**
   * The line, in order, from the initial position. Steps alternate sides
   * (White, Black, White, ...). Every SAN must be legal in the position
   * produced by replaying all previous steps.
   */
  steps: OpeningStep[];
}

/** A complete, learnable opening with one or more variations. */
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
   * The opening's variations. The first entry is treated as the main line.
   * Provide this for any new opening.
   */
  variations?: Variation[];
  /**
   * Legacy single main line. Kept for back-compat: if `variations` is absent,
   * the app treats these steps as a single "Main Line" variation. Prefer
   * `variations` for new openings.
   */
  steps?: OpeningStep[];
}
