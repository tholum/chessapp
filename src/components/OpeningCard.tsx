import { Link } from 'react-router-dom';
import type { Opening } from '../types';
import { getVariations, mainVariation } from '../data/openings';

interface OpeningCardProps {
  opening: Opening;
  featured?: boolean;
}

export function OpeningCard({ opening, featured = false }: OpeningCardProps) {
  const variationCount = getVariations(opening).length;
  const mainMoves = mainVariation(opening).steps.length;
  return (
    <Link
      to={`/learn/${opening.id}`}
      className={[
        'group relative flex flex-col overflow-hidden rounded-xl border bg-surface bg-card-sheen p-6 shadow-card',
        'transition-all duration-200 ease-smooth hover:-translate-y-1 hover:shadow-raised',
        featured
          ? 'border-accent/40 hover:border-accent/70'
          : 'border-border/70 hover:border-primary/60',
      ].join(' ')}
    >
      {featured && (
        <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
          Recommended
        </span>
      )}

      <div className="mb-5 flex items-center gap-3">
        <EcoGlyph eco={opening.eco} featured={featured} />
        <div className="flex flex-col gap-1 font-mono text-xs text-content-muted">
          <span>{opening.eco}</span>
          <span className="capitalize">
            Play as {opening.side} · {mainMoves} moves
            {variationCount > 1 && (
              <span className="ml-1 normal-case text-accent">
                · {variationCount} variations
              </span>
            )}
          </span>
        </div>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-tightish text-content">
        {opening.name}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-content-muted">
        {opening.summary}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary-hover">
          Start lesson
          <span className="ml-1 inline-block transition-transform duration-200 ease-smooth group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>

      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-smooth',
            featured ? 'w-1/3 bg-accent' : 'w-0 bg-primary group-hover:w-1/4',
          ].join(' ')}
        />
      </div>
    </Link>
  );
}

function EcoGlyph({ eco, featured }: { eco: string; featured: boolean }) {
  return (
    <div
      className={[
        'flex h-11 w-11 items-center justify-center rounded-lg border font-display text-lg font-semibold',
        featured
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-primary/30 bg-primary/10 text-primary',
      ].join(' ')}
    >
      {eco[0]}
    </div>
  );
}
