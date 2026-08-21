interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const HairDryerSVG = ({ size = 56, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Body */}
    <rect x="10" y="10" width="28" height="18" rx="9" fill="#818CF8" />
    {/* Nozzle */}
    <path d="M38 14 L46 18 L46 22 L38 26" fill="#6366F1" stroke="#4F46E5" strokeWidth="1" strokeLinejoin="round" />
    {/* Air waves */}
    <g className="air-waves">
      <path d="M46 16 C52 14 54 18 50 20" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M47 19 C53 17 55 21 51 23" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M46 22 C52 20 54 24 50 26" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    {/* Handle */}
    <rect x="16" y="26" width="6" height="12" rx="3" fill="#9ca3af" />
    {/* Button */}
    <rect x="24" y="14" width="6" height="4" rx="1.5" fill="#3730A3" />
    {/* Air intake grille */}
    <line x1="16" y1="14" x2="16" y2="24" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
    <line x1="19" y1="14" x2="19" y2="24" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
    <line x1="22" y1="14" x2="22" y2="24" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
    <line x1="25" y1="14" x2="25" y2="24" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
    <style>{`
      .air-waves path {
        animation: airWave 1.2s ease-in-out infinite;
      }
      .air-waves path:nth-child(2) { animation-delay: 0.15s; }
      .air-waves path:nth-child(3) { animation-delay: 0.3s; }
    `}</style>
  </svg>
);

export default HairDryerSVG;
