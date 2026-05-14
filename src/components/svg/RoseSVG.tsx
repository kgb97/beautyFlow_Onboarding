interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const RoseSVG = ({ size = 40, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Stem */}
    <path
      d="M20 22C20 22 18 30 18 38C18 42 20 46 20 49"
      stroke="#65a30d"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Leaf */}
    <path
      d="M18 32C14 28 10 30 12 34C14 38 18 35 18 32Z"
      fill="#84cc16"
      opacity="0.8"
    />
    {/* Petal 1 - back */}
    <path
      d="M20 22C16 16 8 18 10 24C12 28 16 26 20 22Z"
      fill="#f472b6"
    />
    {/* Petal 2 - left */}
    <path
      d="M20 22C14 18 8 22 12 28C14 30 18 28 20 22Z"
      fill="#ec4899"
    />
    {/* Petal 3 - right */}
    <path
      d="M20 22C26 18 32 22 28 28C26 30 22 28 20 22Z"
      fill="#db2777"
    />
    {/* Petal 4 - bottom */}
    <path
      d="M20 22C16 24 16 30 20 32C24 30 24 24 20 22Z"
      fill="#be185d"
    />
    {/* Center spiral */}
    <path
      d="M20 22C19 20 21 20 22 21C23 22 21 24 20 23C19 22 20 21 20 22Z"
      fill="#fdf2f8"
    />
  </svg>
);

export default RoseSVG;
