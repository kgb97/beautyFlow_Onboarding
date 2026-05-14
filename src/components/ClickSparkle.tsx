import { useState, useCallback } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
}

const SPARKLE_COLORS = ['#db2777', '#c9a96e', '#a855f7', '#ec4899'];

const ClickSparkle = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSparkles: Sparkle[] = [];

    for (let i = 0; i < 6; i++) {
      newSparkles.push({
        id: Date.now() + i,
        x,
        y,
        angle: (360 / 6) * i + Math.random() * 20,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      });
    }

    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 600);
  }, []);

  return {
    sparkles,
    addSparkle,
    SparkleOverlay: sparkles.length > 0 ? (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
        {sparkles.map(s => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: s.color,
              animation: `sparkleBurst 0.6s ease-out forwards`,
              '--tx': `${Math.cos((s.angle * Math.PI) / 180) * 40}px`,
              '--ty': `${Math.sin((s.angle * Math.PI) / 180) * 40}px`,
              transform: 'translate(-50%, -50%)',
            } as React.CSSProperties}
          />
        ))}
      </div>
    ) : null,
  };
};

export default ClickSparkle;
