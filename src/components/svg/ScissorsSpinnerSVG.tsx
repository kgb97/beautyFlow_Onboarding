interface SVGProps {
  size?: number;
  className?: string;
}

const ScissorsSpinnerSVG = ({ size = 24, className }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ animation: 'spin 1s linear infinite' }}
  >
    <path
      d="M6 18 C4 14 3 10 3 8 L7 8 C7 10 8 14 6 18Z"
      fill="currentColor"
      opacity="0.6"
    />
    <path
      d="M18 18 C20 14 21 10 21 8 L17 8 C17 10 16 14 18 18Z"
      fill="currentColor"
      opacity="0.6"
    />
    <circle cx="6" cy="7" r="2" fill="currentColor" />
    <circle cx="18" cy="7" r="2" fill="currentColor" />
    <circle cx="12" cy="16" r="2.5" fill="currentColor" />
  </svg>
);

export default ScissorsSpinnerSVG;
