import { Scissors } from 'lucide-react';

const LOGOS = [
  { name: 'Salón Glamour', color: '#db2777' },
  { name: 'Studio Luxe', color: '#9333ea' },
  { name: 'Belleza Total', color: '#c9a96e' },
  { name: 'Deluxe Spa', color: '#ec4899' },
  { name: 'Reina Beauty', color: '#a855f7' },
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
