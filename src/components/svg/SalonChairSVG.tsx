interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const SalonChairSVG = ({ size = 120, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Base - round plate */}
    <ellipse cx="60" cy="132" rx="35" ry="6" fill="#d1d5db" />
    <ellipse cx="60" cy="130" rx="35" ry="6" fill="#f3f4f6" />
    {/* Center pole */}
    <rect x="56" y="85" width="8" height="46" rx="2" fill="#9ca3af" />
    {/* Seat cushion */}
    <rect x="30" y="75" width="60" height="14" rx="6" fill="#ec4899" />
    <rect x="30" y="75" width="60" height="8" rx="6" fill="#f472b6" />
    {/* Backrest */}
    <path
      d="M34 75 C30 55 32 20 60 14 C88 20 90 55 86 75"
      fill="#ec4899"
      stroke="#db2777"
      strokeWidth="2"
    />
    <path
      d="M38 72 C36 52 38 24 60 18 C82 24 84 52 82 72"
      fill="#f472b6"
      opacity="0.6"
    />
    {/* Armrests */}
    <rect x="24" y="72" width="12" height="6" rx="3" fill="#f9a8d4" />
    <rect x="84" y="72" width="12" height="6" rx="3" fill="#f9a8d4" />
    {/* Hydraulic cylinder detail */}
    <rect x="54" y="82" width="12" height="6" rx="2" fill="#6b7280" />
  </svg>
);

export default SalonChairSVG;
