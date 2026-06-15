import { useEffect, useRef } from 'react';
import type { PlayedMove } from '../lib/useTrainer';

interface MoveListProps {
  history: PlayedMove[];
  /** Index into history of the move to highlight (usually the last). */
  activeIndex: number;
}

/** Two-column SAN move list in mono, with the active move highlighted. */
export function MoveList({ history, activeIndex }: MoveListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history.length]);

  // Group into full moves: [white, black].
  const rows: { number: number; white?: PlayedMove & { i: number }; black?: PlayedMove & { i: number } }[] = [];
  history.forEach((mv, i) => {
    const rowIndex = Math.floor(i / 2);
    if (!rows[rowIndex]) rows[rowIndex] = { number: rowIndex + 1 };
    if (i % 2 === 0) rows[rowIndex].white = { ...mv, i };
    else rows[rowIndex].black = { ...mv, i };
  });

  if (history.length === 0) {
    return (
      <p className="px-4 py-6 text-center font-mono text-xs text-content-subtle">
        Moves will appear here as you play.
      </p>
    );
  }

  return (
    <div className="max-h-64 overflow-y-auto px-2 py-2">
      <table className="w-full font-mono text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.number}>
              <td className="w-8 select-none py-1 pr-2 text-right align-top text-content-muted">
                {row.number}.
              </td>
              <td className="py-0.5 align-top">
                {row.white && (
                  <Cell move={row.white} active={row.white.i === activeIndex} />
                )}
              </td>
              <td className="py-0.5 align-top">
                {row.black && (
                  <Cell move={row.black} active={row.black.i === activeIndex} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={endRef} />
    </div>
  );
}

function Cell({
  move,
  active,
}: {
  move: PlayedMove & { i: number };
  active: boolean;
}) {
  return (
    <span
      className={[
        'inline-block rounded px-2 py-0.5 transition-colors',
        active
          ? 'border-l-2 border-primary bg-primary/15 text-content'
          : 'text-content',
      ].join(' ')}
    >
      {move.san}
    </span>
  );
}
