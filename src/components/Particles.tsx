import { useState } from 'react';
import SparkleSVG from './svg/SparkleSVG';
import RoseSVG from './svg/RoseSVG';

interface ParticleConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'sparkle' | 'rose';
  color?: string;
}

const PARTICLES_COUNT = 10;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateParticles(): ParticleConfig[] {
  const items: ParticleConfig[] = [];
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    items.push({
      id: i,
      x: randomBetween(5, 95),
      y: randomBetween(8, 90),
      size: randomBetween(24, 48),
      delay: randomBetween(0, 5),
      duration: randomBetween(8, 15),
      type: i % 3 === 0 ? 'rose' : 'sparkle',
      color: i % 2 === 0 ? '#db2777' : '#c9a96e',
    });
  }
  return items;
}

const Particles = () => {
  const [particles] = useState(generateParticles);

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((p) => {
        const driftKey = p.id % 2 === 0 ? 'floatDrift1' : 'floatDrift2';
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `${driftKey} ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0.6,
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'drop-shadow(0 0 6px currentColor)',
            }}
          >
            {p.type === 'rose' ? (
              <div style={{ color: p.color }}>
                <RoseSVG size={p.size} />
              </div>
            ) : (
              <SparkleSVG
                size={p.size}
                style={{
                  animation: `sparkle ${p.duration * 0.5}s ease-in-out infinite`,
                  animationDelay: `${p.delay}s`,
                  color: p.color,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Particles;
