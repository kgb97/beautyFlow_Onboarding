const ClickSparkleStyles = () => (
  <style>{`
    @keyframes sparkleBurst {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
        opacity: 0;
      }
    }
  `}</style>
);

export default ClickSparkleStyles;
