interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CheckmarkAnimatedSVG = ({ size = 64, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Circle */}
    <circle
      cx="40"
      cy="40"
      r="36"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="226"
      strokeDashoffset="226"
      style={{
        animation: 'drawStroke 0.6s ease forwards',
      }}
    />
    {/* Checkmark */}
    <path
      d="M24 40 L35 52 L56 28"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="50"
      strokeDashoffset="50"
      style={{
        animation: 'drawStroke 0.4s ease 0.5s forwards',
      }}
    />
  </svg>
);

export default CheckmarkAnimatedSVG;
