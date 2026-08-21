import { Scissors } from 'lucide-react';

const LOGOS = [
  { name: 'Salón Glamour', color: 'var(--primary)' },
  { name: 'Studio Luxe', color: 'var(--secondary)' },
  { name: 'Belleza Total', color: 'var(--accent)' },
  { name: 'Deluxe Spa', color: 'var(--primary-hover)' },
  { name: 'Reina Beauty', color: 'var(--secondary)' },
];

const TrustBar = () => (
  <div className="trust-bar">
    <div className="container">
      <p className="trust-bar-label">CONFÍAN EN BEAUTYFLOW</p>
      <div className="trust-bar-logos">
        {LOGOS.map((logo, i) => (
          <div key={i} className="trust-logo-item" style={{ '--hover-color': logo.color } as React.CSSProperties}>
            <Scissors size={14} />
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBar;
