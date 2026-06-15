import { Link } from 'react-router-dom';
import { openings } from '../data/openings';
import { OpeningCard } from '../components/OpeningCard';
import { HeroBoard } from '../components/HeroBoard';

export default function Home() {
  const recommendedId = 'italian-game';

  return (
    <div className="bg-hero-radial">
      {/* HERO */}
      <section className="mx-auto grid max-w-shell items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <p className="eyebrow mb-5">Opening Mastery</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tightish text-content">
            Learn chess openings the way they were meant to be{' '}
            <em className="italic text-primary">understood</em>.
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-content-muted">
            A calm, guided trainer that walks you move-by-move through the
            essential openings &mdash; explaining the <em>why</em> behind every
            move, then letting you finish the game against the engine.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to={`/learn/${recommendedId}`} className="btn-primary px-6 py-3">
              Start training
            </Link>
            <Link to="/play" className="btn-ghost px-6 py-3">
              Play vs computer
            </Link>
            <a href="#openings" className="btn-ghost px-6 py-3">
              See how it works
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md animate-fade-up lg:mx-0">
          <HeroBoard />
        </div>
      </section>

      {/* PLAY CHESS CTA */}
      <section className="mx-auto max-w-shell px-5 pb-20">
        <div className="card-surface flex flex-col items-start gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-prose">
            <p className="eyebrow mb-3">Play Chess</p>
            <h2 className="font-display text-3xl font-semibold tracking-tightish text-content sm:text-4xl">
              Jump straight into a game vs the computer
            </h2>
            <p className="mt-4 text-content-muted">
              Skip the lesson and just play. Choose your opponent&rsquo;s
              strength by estimated ELO &mdash; from a gentle, beginner-friendly{' '}
              <em className="text-content">~300</em> default up to a serious
              challenge. Pick your side and start whenever you&rsquo;re ready.
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/play" className="btn-primary px-6 py-3">
              Play a game
            </Link>
          </div>
        </div>
      </section>

      {/* OPENINGS GRID */}
      <section
        id="openings"
        className="mx-auto max-w-shell scroll-mt-24 px-5 pb-24"
      >
        <div className="mb-10 flex flex-col gap-3 text-center">
          <p className="eyebrow">The curriculum</p>
          <h2 className="font-display text-3xl font-semibold tracking-tightish text-content sm:text-4xl">
            Master the essential openings
          </h2>
          <p className="mx-auto max-w-prose text-content-muted">
            Each lesson is a hand-picked main line with beginner-friendly
            coaching on every move. Pick one and play it through.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {openings.map((opening) => (
            <OpeningCard
              key={opening.id}
              opening={opening}
              featured={opening.id === recommendedId}
            />
          ))}
        </div>

        {openings.length < 2 && (
          <p className="mt-8 text-center font-mono text-xs text-content-subtle">
            More openings are on the way.
          </p>
        )}
      </section>
    </div>
  );
}
