/** Brand wordmark with a small knight glyph. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-primary"
      >
        <path
          d="M7 21h11v-1.5c0-1-.6-1.7-1.5-2 .7-2.3.5-4.9-1.2-6.8L13.7 8.8c.4-.3.6-.7.6-1.2 0-.9-.7-1.6-1.6-1.6-.4 0-.8.1-1 .4l-.5.5-.7-1.6c-.2-.5-.7-.8-1.2-.8-.4 0-.8.2-1.1.5L6 6.8c-.6.7-.5 1.8.3 2.3l1 .6-1.7 2.1c-1 1.3-1.6 2.9-1.6 4.6V18c0 1.5 1.1 2.7 2.5 2.9V21Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tightish text-content">
        Chess <span className="text-primary">Learner</span>
      </span>
    </span>
  );
}
