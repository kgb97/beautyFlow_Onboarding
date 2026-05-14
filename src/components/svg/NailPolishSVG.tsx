interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const NailPolishSVG = ({ size = 24, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Bottle body */}
    <rect x="5" y="10" width="14" height="22" rx="4" fill="#f472b6" />
    <rect x="5" y="10" width="14" height="22" rx="4" fill="url(#nailGradient)" opacity="0.8" />
    {/* Bottle cap */}
    <rect x="8" y="2" width="8" height="10" rx="2" fill="#d4af37" />
    <rect x="9" y="2" width="6" height="8" rx="1.5" fill="#fbbf24" />
    {/* Polish level */}
    <rect x="7" y="18" width="10" height="12" rx="2" fill="#ec4899" />
    {/* Shine */}
    <rect x="7" y="12" width="2" height="8" rx="1" fill="white" opacity="0.3" />
    <defs>
      <linearGradient id="nailGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
    </defs>
  </svg>
);

export default NailPolishSVG;
