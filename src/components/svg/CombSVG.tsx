interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CombSVG = ({ size = 24, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Handle */}
    <rect x="8" y="2" width="8" height="16" rx="3" fill="#db2777" />
    <rect x="9" y="3" width="6" height="14" rx="2" fill="#f472b6" />
    {/* Teeth */}
    <rect x="2" y="18" width="3" height="18" rx="1" fill="#d1d5db" />
    <rect x="7" y="18" width="3" height="18" rx="1" fill="#d1d5db" />
    <rect x="12" y="18" width="3" height="18" rx="1" fill="#d1d5db" />
    <rect x="17" y="18" width="3" height="18" rx="1" fill="#d1d5db" />
    {/* Base of teeth */}
    <rect x="2" y="32" width="20" height="4" rx="1" fill="#e5e7eb" opacity="0.5" />
  </svg>
);

export default CombSVG;
