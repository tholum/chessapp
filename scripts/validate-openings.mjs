// Validates every opening file: replays each variation's SAN moves through
// chess.js and reports any illegal move. Also normalizes legacy `steps`.
// Usage: node scripts/validate-openings.mjs
import { Chess } from 'chess.js';
import { readFileSync, readdirSync } from 'fs';

const dir = 'src/data/openings';
const argFiles = process.argv.slice(2);
const files = (
  argFiles.length
    ? argFiles.map((f) => (f.endsWith('.ts') ? f : `${f}.ts`))
    : readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')
);

/** Crudely turn an opening data module into its plain object (data-only files). */
function loadOpening(src) {
  const body = src
    .split('\n')
    .filter((l) => !l.trimStart().startsWith('import'))
    .join('\n')
    .replace(/export\s+default\s+\w+\s*;?/g, '')
    .replace(/const\s+\w+\s*:\s*Opening\s*=/, 'return');
  // eslint-disable-next-line no-new-func
  return new Function(body)();
}

function variationsOf(o) {
  if (o.variations && o.variations.length) return o.variations;
  return [{ id: 'main', name: 'Main Line', steps: o.steps ?? [] }];
}

let failures = 0;
let totalVariations = 0;

for (const f of files) {
  let opening;
  try {
    opening = loadOpening(readFileSync(`${dir}/${f}`, 'utf8'));
  } catch (e) {
    console.log(`FAIL  ${f}  — could not parse: ${e.message}`);
    failures++;
    continue;
  }
  const variations = variationsOf(opening);
  for (const v of variations) {
    totalVariations++;
    const game = new Chess();
    let ok = true;
    for (const step of v.steps) {
      try {
        game.move(step.san);
      } catch {
        ok = false;
        console.log(
          `FAIL  ${opening.id} › ${v.name}: illegal SAN "${step.san}" at ply ${
            game.history().length + 1
          }`,
        );
        failures++;
        break;
      }
    }
    if (ok) {
      console.log(
        `ok    ${opening.id} › ${v.name} (${v.steps.length} plies)`,
      );
    }
  }
}

console.log(
  `\n${files.length} openings, ${totalVariations} variations, ${failures} failure(s).`,
);
process.exit(failures ? 1 : 0);
