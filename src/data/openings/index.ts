import type { Opening, Variation } from '../../types';
import italianGame from './italian-game';
import ruyLopez from './ruy-lopez';
import scotchGame from './scotch-game';
import viennaGame from './vienna-game';
import kingsGambit from './kings-gambit';
import queensGambit from './queens-gambit';
import londonSystem from './london-system';
import englishOpening from './english-opening';
import caroKann from './caro-kann';
import frenchDefense from './french-defense';
import scandinavian from './scandinavian';
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
  scotchGame,
  viennaGame,
  kingsGambit,
  queensGambit,
  londonSystem,
  englishOpening,
  caroKann,
  frenchDefense,
  scandinavian,
  sicilianDefense,
];

/** Look up an opening by its id. Returns undefined if not found. */
export function getOpening(id: string): Opening | undefined {
  return openings.find((o) => o.id === id);
}

/**
 * Normalize an opening to its list of variations. New openings supply
 * `variations` directly; legacy ones with a single `steps` line are wrapped
 * into a single "Main Line" variation so the rest of the app has one shape.
 */
export function getVariations(opening: Opening): Variation[] {
  if (opening.variations && opening.variations.length > 0) {
    return opening.variations;
  }
  return [{ id: 'main', name: 'Main Line', steps: opening.steps ?? [] }];
}

/** The opening's primary (first) variation — used for cards and previews. */
export function mainVariation(opening: Opening): Variation {
  return getVariations(opening)[0];
}
