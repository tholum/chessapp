import { useEffect, useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import {
  boardStyle,
  darkSquareStyle,
  lightSquareStyle,
} from '../lib/board';

/**
 * A decorative, non-interactive board that slowly plays through the Italian
 * Game main line, looping forever. Anchors the brand on the home hero.
 */
const LINE = ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6'];

export function HeroBoard() {
  const [ply, setPly] = useState(0);

  const fen = useMemo(() => {
    const game = new Chess();
    for (let i = 0; i < ply; i++) {
      try {
        game.move(LINE[i]);
      } catch {
        break;
      }
    }
    return game.fen();
  }, [ply]);

  useEffect(() => {
    const t = window.setInterval(() => {
      setPly((p) => (p >= LINE.length ? 0 : p + 1));
    }, 1400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative rounded-2xl border border-accent/20 bg-raised p-3 shadow-board">
      <div className="pointer-events-none overflow-hidden rounded-lg ring-1 ring-inset ring-accent/20">
        <Chessboard
          position={fen}
          arePiecesDraggable={false}
          customBoardStyle={boardStyle}
          customLightSquareStyle={lightSquareStyle}
          customDarkSquareStyle={darkSquareStyle}
          animationDuration={350}
        />
      </div>
    </div>
  );
}
