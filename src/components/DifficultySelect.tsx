import { DIFFICULTY_LEVELS, getDifficulty } from '../lib/difficulty';

interface DifficultySelectProps {
  /** Currently selected level id. */
  value: string;
  onChange: (id: string) => void;
  /** Hide the descriptive blurb under the chips. */
  hideBlurb?: boolean;
  className?: string;
}

/**
 * Shared opponent-strength picker: a row of chips labelled by name + estimated
 * ELO, with a one-line blurb for the active level. Used by the Play page and
 * the lesson "finish the game" handoff.
 */
export function DifficultySelect({
  value,
  onChange,
  hideBlurb = false,
  className = '',
}: DifficultySelectProps) {
  const active = getDifficulty(value);
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {DIFFICULTY_LEVELS.map((level) => {
          const isActive = level.id === value;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange(level.id)}
              title={level.blurb}
              aria-pressed={isActive}
              className={[
                'flex items-baseline gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'border-primary bg-primary/15 text-content'
                  : 'border-border text-content-muted hover:border-primary/60 hover:text-content',
              ].join(' ')}
            >
              <span>{level.label}</span>
              <span
                className={[
                  'font-mono text-[10px]',
                  isActive ? 'text-primary' : 'text-content-subtle',
                ].join(' ')}
              >
                ~{level.elo}
              </span>
            </button>
          );
        })}
      </div>
      {!hideBlurb && (
        <p className="mt-2 text-xs leading-relaxed text-content-muted">
          <span className="text-content">
            {active.label} · ~{active.elo} ELO
          </span>{' '}
          — {active.blurb}
        </p>
      )}
    </div>
  );
}
