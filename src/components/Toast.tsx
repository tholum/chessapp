import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';

type ToastVariant = 'info' | 'success' | 'danger';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  notify: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * In-page toast notifications. We NEVER use window.alert/confirm/prompt; all
 * messages go through this calm, styled toast stack.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = nextId.current++;
      setToasts((t) => [...t, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), 3600);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            className={[
              'pointer-events-auto animate-fade-up rounded-xl border px-4 py-3 text-left text-sm font-medium shadow-raised backdrop-blur',
              t.variant === 'success' &&
                'border-success/40 bg-success/10 text-success',
              t.variant === 'danger' &&
                'border-danger/40 bg-danger/10 text-danger',
              t.variant === 'info' &&
                'border-border/70 bg-raised/90 text-content',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {t.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
