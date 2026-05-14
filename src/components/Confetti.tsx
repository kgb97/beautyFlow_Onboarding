import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
  color: string;
  shape: 'circle' | 'star' | 'scissor';
}

const CONFETTI_COUNT = 100;
const COLORS = ['#db2777', '#ec4899', '#9333ea', '#c9a96e', '#f472b6', '#a855f7', '#f59e0b'];

function generatePieces(): ConfettiPiece[] {
  const items: ConfettiPiece[] = [];
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    items.push({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 3,
      rotation: Math.random() * 720,
      size: 6 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: (['circle', 'star', 'scissor'] as const)[Math.floor(Math.random() * 3)],
    });
  }
  return items;
}

const Confetti = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const [pieces] = useState(generatePieces);

  if (!show) return null;

  return (
    <div className="confetti-container" aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-10px',
            width: p.shape === 'scissor' ? p.size * 1.5 : p.size,
            height: p.size,
            animation: `confettiFall ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.shape === 'circle' && (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: p.color,
                opacity: 0.9,
              }}
            />
          )}
          {p.shape === 'star' && (
            <svg viewBox="0 0 24 24" width={p.size} height={p.size} fill={p.color}>
              <path d="M12 0C12 0 11.5 8 8 11.5C11.5 12 12 20 12 20C12 20 12.5 12 16 11.5C12.5 8 12 0 12 0Z" />
            </svg>
          )}
          {p.shape === 'scissor' && (
            <svg viewBox="0 0 24 24" width={p.size * 1.5} height={p.size} fill={p.color}>
              <path d="M6 20 C3 16 2 10 2 8 L8 8 C8 10 7 16 6 20Z" />
              <path d="M18 20 C21 16 22 10 22 8 L16 8 C16 10 17 16 18 20Z" />
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
