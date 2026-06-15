import { useEffect, useState } from 'react';
import { getEngine } from '../engine/stockfish';

export type EngineStatus = 'loading' | 'ready' | 'offline';

/**
 * Probes the Stockfish engine once on mount. The board lesson works fully
 * without it; this only governs whether "Finish vs Stockfish" is enabled.
 */
export function useEngineStatus(): EngineStatus {
  const [status, setStatus] = useState<EngineStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    getEngine()
      .init()
      .then(() => {
        if (!cancelled) setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('offline');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
