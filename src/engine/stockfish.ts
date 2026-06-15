// Browser-only Stockfish wrapper for Vite + React + TypeScript.
//
// Loads a SINGLE self-contained asm.js Stockfish build from cdnjs, wraps it in a
// same-origin Blob URL, and runs it as a Web Worker speaking UCI over
// postMessage. Nothing is imported into the bundle, so the build cannot break on
// this dependency. Every failure path rejects with StockfishUnavailableError so
// the UI can render "engine offline" instead of crashing.

/** A UCI move string, e.g. "e2e4" or "e7e8q" (promotion). */
export type UciMove = string;

export interface BestMoveOptions {
  /** Search depth in plies. Lower = weaker + faster. Ignored if movetimeMs set. */
  depth?: number;
  /** Cap thinking time in milliseconds (`go movetime`). Wins over `depth`. */
  movetimeMs?: number;
  /** Stockfish "Skill Level" 0 (weakest) .. 20 (full strength). */
  skill?: number;
  /** Abort the search if no bestmove arrives within this many ms. */
  timeoutMs?: number;
}

const DEFAULTS = {
  depth: 10,
  skill: 5,
  timeoutMs: 15_000,
} as const;

const STOCKFISH_CDN_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js';

export class StockfishUnavailableError extends Error {
  readonly cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'StockfishUnavailableError';
    this.cause = cause;
  }
}

class StockfishEngine {
  private worker: Worker | null = null;
  private blobUrl: string | null = null;
  private initPromise: Promise<void> | null = null;
  private queue: Promise<unknown> = Promise.resolve();
  private appliedSkill: number | null = null;

  init(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      if (typeof Worker === 'undefined') {
        throw new StockfishUnavailableError('Web Workers are not available.');
      }

      let source: string;
      try {
        const res = await fetch(STOCKFISH_CDN_URL, { cache: 'force-cache' });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} fetching engine`);
        }
        source = await res.text();
      } catch (err) {
        throw new StockfishUnavailableError(
          'Failed to download the Stockfish engine.',
          err,
        );
      }

      try {
        this.blobUrl = URL.createObjectURL(
          new Blob([source], { type: 'application/javascript' }),
        );
        this.worker = new Worker(this.blobUrl);
      } catch (err) {
        this.cleanup();
        throw new StockfishUnavailableError(
          'Failed to start the Stockfish worker.',
          err,
        );
      }

      try {
        await this.handshake();
      } catch (err) {
        this.cleanup();
        throw err instanceof StockfishUnavailableError
          ? err
          : new StockfishUnavailableError('Engine handshake failed.', err);
      }
    })();

    this.initPromise.catch(() => {
      this.initPromise = null;
    });

    return this.initPromise;
  }

  private handshake(): Promise<void> {
    const worker = this.worker;
    if (!worker) {
      return Promise.reject(new StockfishUnavailableError('Worker not created.'));
    }

    return new Promise<void>((resolve, reject) => {
      let sawUciOk = false;
      const timeout = setTimeout(() => {
        cleanup();
        reject(new StockfishUnavailableError('Engine handshake timed out.'));
      }, 10_000);

      const onError = (e: ErrorEvent) => {
        cleanup();
        reject(new StockfishUnavailableError('Engine worker error.', e.message));
      };

      const onMessage = (e: MessageEvent) => {
        const line = typeof e.data === 'string' ? e.data : String(e.data ?? '');
        if (!sawUciOk && line.includes('uciok')) {
          sawUciOk = true;
          worker.postMessage('isready');
        } else if (line.includes('readyok')) {
          cleanup();
          resolve();
        }
      };

      const cleanup = () => {
        clearTimeout(timeout);
        worker.removeEventListener('message', onMessage);
        worker.removeEventListener('error', onError);
      };

      worker.addEventListener('message', onMessage);
      worker.addEventListener('error', onError);
      worker.postMessage('uci');
    });
  }

  /**
   * Compute the engine's best move for a position given as FEN. Resolves to a
   * UCI move like "e2e4", or "(none)" if the side to move is mated/stalemated.
   */
  async getBestMove(fen: string, opts: BestMoveOptions = {}): Promise<UciMove> {
    await this.init();

    const depth = opts.depth ?? DEFAULTS.depth;
    const skill = clampSkill(opts.skill ?? DEFAULTS.skill);
    const timeoutMs = opts.timeoutMs ?? DEFAULTS.timeoutMs;

    const run = this.queue.then(() =>
      this.search(fen, { depth, skill, movetimeMs: opts.movetimeMs, timeoutMs }),
    );
    this.queue = run.catch(() => undefined);
    return run;
  }

  /** Non-throwing convenience wrapper: returns null instead of rejecting. */
  async getBestMoveSafe(
    fen: string,
    opts?: BestMoveOptions,
  ): Promise<UciMove | null> {
    try {
      return await this.getBestMove(fen, opts);
    } catch {
      return null;
    }
  }

  private search(
    fen: string,
    opts: Required<Pick<BestMoveOptions, 'depth' | 'skill' | 'timeoutMs'>> & {
      movetimeMs?: number;
    },
  ): Promise<UciMove> {
    const worker = this.worker;
    if (!worker) {
      return Promise.reject(
        new StockfishUnavailableError('Engine not initialized.'),
      );
    }

    return new Promise<UciMove>((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        try {
          worker.postMessage('stop');
        } catch {
          /* ignore */
        }
        reject(new StockfishUnavailableError('Search timed out.'));
      }, opts.timeoutMs);

      const onError = (e: ErrorEvent) => {
        cleanup();
        reject(new StockfishUnavailableError('Engine worker error.', e.message));
      };

      const onMessage = (e: MessageEvent) => {
        const line = typeof e.data === 'string' ? e.data : String(e.data ?? '');
        const match = line.match(/^bestmove\s+(\S+)/);
        if (match) {
          cleanup();
          resolve(match[1]);
        }
      };

      const cleanup = () => {
        clearTimeout(timeout);
        worker.removeEventListener('message', onMessage);
        worker.removeEventListener('error', onError);
      };

      worker.addEventListener('message', onMessage);
      worker.addEventListener('error', onError);

      if (this.appliedSkill !== opts.skill) {
        worker.postMessage(`setoption name Skill Level value ${opts.skill}`);
        this.appliedSkill = opts.skill;
      }

      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(
        opts.movetimeMs != null
          ? `go movetime ${opts.movetimeMs}`
          : `go depth ${opts.depth}`,
      );
    });
  }

  /** Terminate the worker and release the Blob URL. */
  dispose(): void {
    this.cleanup();
    this.initPromise = null;
    this.appliedSkill = null;
    this.queue = Promise.resolve();
  }

  private cleanup(): void {
    if (this.worker) {
      try {
        this.worker.postMessage('quit');
      } catch {
        /* ignore */
      }
      this.worker.terminate();
      this.worker = null;
    }
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }
  }
}

function clampSkill(skill: number): number {
  if (Number.isNaN(skill)) return DEFAULTS.skill;
  return Math.max(0, Math.min(20, Math.round(skill)));
}

let singleton: StockfishEngine | null = null;

/** Get the shared Stockfish engine instance (survives React re-renders). */
export function getEngine(): StockfishEngine {
  if (!singleton) singleton = new StockfishEngine();
  return singleton;
}

/** Convenience: best move from the shared engine. Rejects if engine offline. */
export function getBestMove(
  fen: string,
  opts?: BestMoveOptions,
): Promise<UciMove> {
  return getEngine().getBestMove(fen, opts);
}

/** Convenience: best move from the shared engine, or null if anything fails. */
export function getBestMoveSafe(
  fen: string,
  opts?: BestMoveOptions,
): Promise<UciMove | null> {
  return getEngine().getBestMoveSafe(fen, opts);
}

export type { StockfishEngine };
