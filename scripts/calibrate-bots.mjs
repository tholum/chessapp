// scripts/calibrate-bots.mjs
//
// Objectively measure how strong each difficulty level in src/lib/difficulty.ts
// actually plays, by measuring average centipawn loss (ACPL) and blunder rate
// per move — NOT by playing full games (fast + low variance).
//
// It replicates, in Node:
//   - src/engine/stockfish.ts  getTopMoves (full strength, MultiPV, `go depth N`)
//   - src/lib/engineMove.ts     blunderChance howler + sampleByTemperature softmax
//
// Engine: the `stockfish` npm package (Stockfish 18 lite, single-threaded WASM).
// CAVEAT: the app ships cdnjs stockfish.js 10.0.2 (a much older/weaker asm.js
// build). This script uses a newer/stronger engine, so absolute ACPL/Elo will
// differ from production. What transfers is the RELATIVE ORDERING of levels and
// the blunder rates (which are driven by our sampling math, not the engine).
//
// Run:  node scripts/calibrate-bots.mjs

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const require = createRequire(path.join(ROOT, 'package.json'));

const { Chess } = require('chess.js');
const initEngine = require('stockfish');

// ---------------------------------------------------------------------------
// Difficulty ladder — kept in sync with src/lib/difficulty.ts (do not edit src).
// ---------------------------------------------------------------------------
const DIFFICULTY_LEVELS = [
  { id: 'beginner',     elo: 300,  depth: 4,  multipv: 10, temperature: 400, blunderChance: 0.45 },
  { id: 'novice',       elo: 600,  depth: 5,  multipv: 8,  temperature: 380, blunderChance: 0.26 },
  { id: 'casual',       elo: 900,  depth: 6,  multipv: 6,  temperature: 230, blunderChance: 0.13 },
  { id: 'intermediate', elo: 1200, depth: 8,  multipv: 6,  temperature: 165, blunderChance: 0.05 },
  { id: 'skilled',      elo: 1500, depth: 10, multipv: 6,  temperature: 105, blunderChance: 0.01 },
  { id: 'advanced',     elo: 1800, depth: 12, multipv: 4,  temperature: 40,  blunderChance: 0 },
  { id: 'expert',       elo: 2200, depth: 15, multipv: 1,  temperature: 0,   blunderChance: 0 },
];

// Target human ACPL bands (lichess-ish) per Elo, for interpretation.
const TARGET_BANDS = {
  300:  [180, 250],
  600:  [120, 170],
  900:  [90, 120],
  1200: [60, 85],
  1500: [40, 55],
  1800: [25, 38],
  2200: [0, 18],
};

// Tunables (reduce to go faster).
const TRIALS = 8;          // sampling trials per (level, position)
const REF_DEPTH = 12;      // reference judge search depth
const CLAMP = 1000;        // centipawn-loss clamp
const BLUNDER_THRESHOLD = 300;

// ---------------------------------------------------------------------------
// Logic copied verbatim from src/lib/engineMove.ts.
// ---------------------------------------------------------------------------
function randomLegalUci(fen) {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  const m = moves[Math.floor(Math.random() * moves.length)];
  return `${m.from}${m.to}${m.promotion ?? ''}`;
}

function sampleByTemperature(candidates, temperature) {
  if (candidates.length === 1 || temperature <= 0) return candidates[0].move;
  const scores = candidates.map((c) => Math.max(-1000, Math.min(1000, c.scoreCp)));
  const max = Math.max(...scores);
  const weights = scores.map((s) => Math.exp((s - max) / temperature));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i].move;
  }
  return candidates[candidates.length - 1].move;
}

// ---------------------------------------------------------------------------
// Stockfish driver — one engine, serialized searches.
// ---------------------------------------------------------------------------
let ENGINE = null;
let currentMultiPV = null;

async function startEngine() {
  const engine = await initEngine('lite-single');
  const lines = [];
  engine._buf = lines;
  engine.print = (line) => { if (typeof line === 'string') lines.push(line); };
  engine.listener = engine.print;
  engine.sendCommand('uci');
  engine.sendCommand('setoption name Threads value 1');
  engine.sendCommand('setoption name Skill Level value 20'); // honest evals, like getTopMoves
  await ready(engine);
  ENGINE = engine;
}

function ready(engine) {
  return new Promise((resolve) => {
    const start = engine._buf.length;
    engine.sendCommand('isready');
    const tick = () => {
      for (let i = start; i < engine._buf.length; i++) {
        if (engine._buf[i].includes('readyok')) return resolve();
      }
      setTimeout(tick, 5);
    };
    tick();
  });
}

// Replicates getTopMoves(): set MultiPV, `go depth N`, keep deepest score+move
// per multipv index, sort best-first by index, parse score cp|mate.
function getTopMoves(fen, { depth, multipv }) {
  return new Promise((resolve) => {
    const engine = ENGINE;
    if (currentMultiPV !== multipv) {
      engine.sendCommand(`setoption name MultiPV value ${multipv}`);
      currentMultiPV = multipv;
    }
    const start = engine._buf.length;
    const byIndex = new Map();
    const tick = () => {
      for (let i = start; i < engine._buf.length; i++) {
        const line = engine._buf[i];
        const bm = line.match(/^bestmove\s+(\S+)/);
        if (bm) {
          if (bm[1] === '(none)') return resolve([]);
          const list = [...byIndex.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v);
          return resolve(list.length > 0 ? list : [{ move: bm[1], scoreCp: 0 }]);
        }
        if (!line.startsWith('info')) continue;
        const idxMatch = line.match(/ multipv (\d+)/);
        const pvMatch = line.match(/ pv (\S+)/);
        const scoreMatch = line.match(/ score (cp|mate) (-?\d+)/);
        if (!idxMatch || !pvMatch || !scoreMatch) continue;
        const idx = Number(idxMatch[1]);
        let scoreCp;
        if (scoreMatch[1] === 'cp') scoreCp = Number(scoreMatch[2]);
        else {
          const mateIn = Number(scoreMatch[2]);
          scoreCp = (mateIn >= 0 ? 1 : -1) * (100_000 - Math.abs(mateIn));
        }
        byIndex.set(idx, { move: pvMatch[1], scoreCp });
      }
      setTimeout(tick, 3);
    };
    engine.sendCommand(`position fen ${fen}`);
    engine.sendCommand(`go depth ${depth}`);
    tick();
  });
}

// Reference judge: best-move score for side to move at REF_DEPTH, MultiPV 1.
async function refScore(fen) {
  const top = await getTopMoves(fen, { depth: REF_DEPTH, multipv: 1 });
  if (top.length === 0) return null; // terminal
  return top[0].scoreCp;
}

// ---------------------------------------------------------------------------
// Position suite (~40): openings, middlegames, simple endgames. Built by
// playing known/random moves from start with chess.js so all have many legal
// moves. We snapshot FENs once so every level sees the identical suite.
// ---------------------------------------------------------------------------
function buildSuite() {
  const fens = [];
  const add = (fen) => {
    const g = new Chess(fen);
    if (g.isGameOver()) return;
    if (g.moves().length < 6) return; // need many legal moves
    fens.push(fen);
  };

  // Hand-picked opening / middlegame / endgame FENs (varied, both colors to move).
  const handpicked = [
    // Openings / early middlegame
    'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 4 3',
    'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 5 4',
    'rnbqkb1r/pp2pppp/3p1n2/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 5',
    'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    'rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 3',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
    'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    'r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 5',

    // Middlegames (tactical / positional, many moves)
    'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    'r2q1rk1/ppp1bppp/2np1n2/4p3/2B1P1b1/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 9',
    'r1bqr1k1/pp1n1ppp/2pb1n2/3p4/3P4/2NBPN2/PPQ2PPP/R1B2RK1 w - - 0 11',
    '2rq1rk1/pp1bppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 12',
    'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2NBPN2/PPP2PPP/R1BQ1RK1 w - - 0 9',
    'r2qr1k1/pp1n1pbp/2pp1np1/4p3/2PPP3/2N1BN1P/PP3PP1/R2Q1RK1 b - - 0 12',
    '2r2rk1/1bqnbppp/p2ppn2/1p6/3NP3/1BN1BP2/PPPQ2PP/2KR3R w - - 0 14',
    'r1b2rk1/2q1bppp/p1nppn2/1p6/3NPP2/2N1B3/PPPQB1PP/R4RK1 w - - 0 13',
    'rq3rk1/pb1nbppp/1p2pn2/2pp4/2PP4/1PN1PN2/PB3PPP/R2QRBK1 w - - 0 12',
    'r4rk1/1bqnbppp/pp2pn2/2pp4/3P1B2/2PBPN2/PP1NQPPP/R4RK1 w - - 0 12',

    // Endgames with enough material to make meaningful moves
    '8/5k2/8/2pP4/2P5/8/5K2/8 w - - 0 1',           // K+P
    '8/2k5/8/8/3K4/8/4P3/8 w - - 0 1',
    '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',          // KP endgame both sides
    '8/p4ppk/8/8/8/8/PP3PPK/8 w - - 0 1',
    '8/2k5/2p5/2P5/8/3K4/8/2R4r w - - 0 1',         // R endgame
    '8/8/4kpp1/8/4P1P1/5K2/8/8 w - - 0 1',
    '8/8/3k4/8/3K1R2/8/8/4r3 w - - 0 1',
    '6k1/5p1p/6p1/8/8/1P6/P4PPP/6K1 w - - 0 1',
    'r5k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',        // rook endgame
    '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
    '8/8/2k5/8/2K1B3/8/8/8 w - - 0 1',              // K+B vs K (few moves but legal)
    '8/8/1k6/8/1K1N4/8/8/8 w - - 0 1',
  ];
  handpicked.forEach(add);

  // Derive a few more middlegame positions by random walking from start.
  let seed = 1234567;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let p = 0; p < 8; p++) {
    const g = new Chess();
    const plies = 8 + Math.floor(rnd() * 10);
    for (let i = 0; i < plies; i++) {
      const ms = g.moves();
      if (ms.length === 0) break;
      g.move(ms[Math.floor(rnd() * ms.length)]);
    }
    add(g.fen());
  }

  return fens;
}

// ---------------------------------------------------------------------------
// Main calibration loop.
// ---------------------------------------------------------------------------
async function main() {
  console.log('Starting Stockfish (npm stockfish 18 lite-single)...');
  await startEngine();

  const SUITE = buildSuite();
  console.log(`Position suite: ${SUITE.length} positions.`);
  console.log(`Trials/position: ${TRIALS}, ref depth: ${REF_DEPTH}\n`);

  // Cache reference best-move score per FEN (depth 12, mover's perspective).
  const refBest = new Map();
  // Cache reference eval of the child position after a chosen UCI move.
  const childEvalCache = new Map(); // key: fen|uci -> score (mover's perspective)

  for (const fen of SUITE) {
    refBest.set(fen, await refScore(fen));
  }

  // Evaluate a chosen move from `fen`: make it, ref-search the child, negate.
  async function moverEvalAfter(fen, uci) {
    const key = `${fen}|${uci}`;
    if (childEvalCache.has(key)) return childEvalCache.get(key);
    const g = new Chess(fen);
    const from = uci.slice(0, 2), to = uci.slice(2, 4), promo = uci.slice(4) || undefined;
    let mv;
    try { mv = g.move({ from, to, promotion: promo }); }
    catch { mv = null; }
    if (!mv) { childEvalCache.set(key, null); return null; }
    let val;
    if (g.isGameOver()) {
      // Checkmate delivered = winning for mover; draw = 0.
      val = g.isCheckmate() ? (100_000 - 1) : 0;
    } else {
      const childScore = await refScore(g.fen()); // from opponent's perspective
      val = childScore == null ? 0 : -childScore;
    }
    childEvalCache.set(key, val);
    return val;
  }

  const results = [];

  for (const level of DIFFICULTY_LEVELS) {
    let lossSum = 0;
    let lossCount = 0;
    let blunders = 0;
    let howlers = 0;

    for (const fen of SUITE) {
      const best = refBest.get(fen);
      if (best == null) continue; // terminal, skip

      // Engine candidates for THIS level (depth + multipv), like getTopMovesSafe.
      const candidates = await getTopMoves(fen, { depth: level.depth, multipv: level.multipv });
      if (candidates.length === 0) continue;

      for (let t = 0; t < TRIALS; t++) {
        let chosen;
        // Replicate getEngineMove: blunderChance howler first.
        if (level.blunderChance > 0 && Math.random() < level.blunderChance) {
          chosen = randomLegalUci(fen);
          if (chosen == null) chosen = sampleByTemperature(candidates, level.temperature);
          else howlers++;
        } else {
          chosen = sampleByTemperature(candidates, level.temperature);
        }

        const chosenEval = await moverEvalAfter(fen, chosen);
        if (chosenEval == null) continue;
        // ACPL = eval(best) − eval(selected), mover's perspective, clamped.
        let loss = best - chosenEval;
        if (loss < 0) loss = 0; // reference noise: selected can't truly beat best
        if (loss > CLAMP) loss = CLAMP;
        lossSum += loss;
        lossCount++;
        if (loss > BLUNDER_THRESHOLD) blunders++;
      }
    }

    const acpl = lossCount ? lossSum / lossCount : 0;
    const blunderRate = lossCount ? (100 * blunders / lossCount) : 0;
    const howlerRate = lossCount ? (100 * howlers / lossCount) : 0;
    results.push({ ...level, acpl, blunderRate, howlerRate, samples: lossCount });
    console.log(
      `  ${level.id.padEnd(13)} elo~${String(level.elo).padStart(4)}  ` +
      `ACPL=${acpl.toFixed(1).padStart(6)}  blunder%=${blunderRate.toFixed(1).padStart(5)}  ` +
      `(howler%=${howlerRate.toFixed(1)}, n=${lossCount})`,
    );
  }

  // -------------------------------------------------------------------------
  // Report.
  // -------------------------------------------------------------------------
  console.log('\n==================== RESULTS ====================\n');
  console.log('level          elo   ACPL   blunder%  targetBand   status');
  let monotonic = true;
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const band = TARGET_BANDS[r.elo];
    let status;
    if (r.acpl < band[0]) status = 'TOO STRONG (acpl below band)';
    else if (r.acpl > band[1]) status = 'TOO WEAK (acpl above band)';
    else status = 'in band';
    console.log(
      `${r.id.padEnd(13)} ${String(r.elo).padStart(4)} ${r.acpl.toFixed(1).padStart(6)} ` +
      `${r.blunderRate.toFixed(1).padStart(8)}   ${`${band[0]}-${band[1]}`.padStart(8)}   ${status}`,
    );
    if (i > 0 && results[i].acpl > results[i - 1].acpl) monotonic = false;
  }
  console.log(`\nMonotonic ordering (stronger as elo rises): ${monotonic ? 'YES' : 'NO — see above'}`);

  ENGINE.terminate?.();
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
