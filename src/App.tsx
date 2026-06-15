import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { Logo } from './components/Logo';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import PlayChess from './pages/PlayChess';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-40 border-b transition-all duration-300 ease-smooth',
        scrolled
          ? 'border-border/70 bg-bg/70 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'text-content'
                  : 'text-content-muted hover:text-content',
              ].join(' ')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/play"
            className={({ isActive }) =>
              [
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'text-content'
                  : 'text-content-muted hover:text-content',
              ].join(' ')
            }
          >
            Play
          </NavLink>
          <Link to="/learn/italian-game" className="btn-primary ml-1">
            Start training
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-content-subtle sm:flex-row">
        <Logo className="opacity-70" />
        <p className="font-mono text-xs">
          Quiet luxury chess study · built for opening mastery
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/:openingId" element={<Lesson />} />
            <Route path="/play" element={<PlayChess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex max-w-shell flex-col items-center px-5 py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tightish">
        Nothing here
      </h1>
      <p className="mt-3 max-w-prose text-content-muted">
        That page doesn&rsquo;t exist. Head back home to pick an opening.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
