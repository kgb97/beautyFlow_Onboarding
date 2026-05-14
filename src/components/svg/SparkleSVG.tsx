interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const SparkleSVG = ({ size = 24, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M12 0C12 0 11.5 8 8 11.5C11.5 12 12 20 12 20C12 20 12.5 12 16 11.5C12.5 8 12 0 12 0Z"
      fill="currentColor"
    />
    <path
      d="M12 4C12 4 11.8 8.5 9.5 10.5C11.8 10.8 12 14 12 14C12 14 12.2 10.8 14.5 10.5C12.2 8.5 12 4 12 4Z"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);

export default SparkleSVG;
