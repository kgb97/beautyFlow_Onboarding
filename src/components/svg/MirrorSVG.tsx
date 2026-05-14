interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MirrorSVG = ({ size = 64, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Stand base */}
    <rect x="24" y="72" width="16" height="6" rx="2" fill="#d4af37" />
    {/* Stand pole */}
    <rect x="30" y="52" width="4" height="22" rx="2" fill="#d4af37" />
    {/* Frame (oval) */}
    <ellipse cx="32" cy="30" rx="22" ry="28" stroke="#d4af37" strokeWidth="4" fill="none" />
    {/* Glass */}
    <ellipse cx="32" cy="30" rx="19" ry="25" fill="url(#mirrorGradient)" opacity="0.85" />
    {/* Shine/reflection */}
    <path
      d="M22 18 C25 16 30 16 32 18"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    <defs>
      <linearGradient id="mirrorGradient" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#e0e7ff" />
        <stop offset="50%" stopColor="#fce7f3" />
        <stop offset="100%" stopColor="#ede9fe" />
      </linearGradient>
    </defs>
  </svg>
);

export default MirrorSVG;
