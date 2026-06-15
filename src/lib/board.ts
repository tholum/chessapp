/** Shared react-chessboard styling derived from the design system. */

export const lightSquareStyle = { backgroundColor: '#EBE4D2' };
export const darkSquareStyle = { backgroundColor: '#6E7E9B' };

export const boardStyle: Record<string, string | number> = {
  borderRadius: '0.5rem',
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
};

/** Last-move / selected-square wash (board.highlight at ~35%). */
export const highlightSquareStyle: React.CSSProperties = {
  backgroundColor: 'rgba(232, 184, 109, 0.35)',
};

/** Legal-move target dot (board.move at ~45%). */
export const moveDotStyle: React.CSSProperties = {
  background:
    'radial-gradient(circle, rgba(95,212,154,0.45) 22%, transparent 24%)',
};

/** Legal capture target ring. */
export const captureDotStyle: React.CSSProperties = {
  background:
    'radial-gradient(circle, transparent 55%, rgba(95,212,154,0.45) 56%, rgba(95,212,154,0.45) 64%, transparent 66%)',
};
