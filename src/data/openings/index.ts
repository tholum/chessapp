import type { Opening } from '../../types';
import italianGame from './italian-game';
import ruyLopez from './ruy-lopez';
import queensGambit from './queens-gambit';
import londonSystem from './london-system';
import sicilianDefense from './sicilian-defense';

/**
 * The registry of all learnable openings.
 *
 * To add a new opening: create `./<id>.ts` that `export default`s an `Opening`,
 * import it here, and append it to this array. Nothing else needs to change —
 * the home grid and the /learn/:id route are driven entirely by this list.
 *
 * Order is intentional: the gentlest, most principle-driven openings come first
 * for beginners, with the sharper, asymmetrical Sicilian last.
 */
export const openings: Opening[] = [
  italianGame,
  ruyLopez,
  queensGambit,
  londonSystem,
  sicilianDefense,
];

/** Look up an opening by its id. Returns undefined if not found. */
export function getOpening(id: string): Opening | undefined {
  return openings.find((o) => o.id === id);
}
