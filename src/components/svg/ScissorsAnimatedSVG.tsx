interface SVGProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ScissorsAnimatedSVG = ({ size = 32, className, style }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Left blade */}
    <path
      d="M12 22 C8 18 4 14 2 8 C1.5 5.5 3 3 5 4 C7 5 8 8 10 12 C12 16 15 19 17 21"
      stroke="#db2777"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className="scissor-blade-left"
    />
    {/* Right blade */}
    <path
      d="M20 22 C24 18 28 14 30 8 C30.5 5.5 29 3 27 4 C25 5 24 8 22 12 C20 16 17 19 15 21"
      stroke="#db2777"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className="scissor-blade-right"
    />
    {/* Pivot screw */}
    <circle cx="16" cy="22" r="3" fill="#db2777" />
    <circle cx="16" cy="22" r="1.5" fill="#fdf2f8" />
    {/* Handle left */}
    <ellipse cx="8" cy="5" rx="3" ry="5" stroke="#db2777" strokeWidth="1.5" fill="none" transform="rotate(-20 8 5)" />
    {/* Handle right */}
    <ellipse cx="24" cy="5" rx="3" ry="5" stroke="#db2777" strokeWidth="1.5" fill="none" transform="rotate(20 24 5)" />
    <style>{`
      .scissor-blade-left {
        animation: snip 1.5s ease-in-out infinite;
        transform-origin: 16px 22px;
      }
      .scissor-blade-right {
        animation: snip 1.5s ease-in-out infinite reverse;
        transform-origin: 16px 22px;
      }
      @keyframes snip {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(12deg); }
      }
    `}</style>
  </svg>
);

export default ScissorsAnimatedSVG;
