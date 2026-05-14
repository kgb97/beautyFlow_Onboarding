import { useState, useCallback } from 'react';
import ScissorsAnimatedSVG from './svg/ScissorsAnimatedSVG';

interface SalonDividerProps {
  label?: string;
}

const SalonDivider = ({ label }: SalonDividerProps) => {
  const [snipCount, setSnipCount] = useState(0);

  const handleClick = useCallback(() => {
    setSnipCount(prev => prev + 1);
    setTimeout(() => setSnipCount(prev => Math.max(0, prev - 1)), 400);
  }, []);

  return (
    <div
      className="salon-divider"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      title="✂️ Click para snip"
    >
      <div className="sd-line" />
      <div className={`sd-scissors ${snipCount > 0 ? 'snip' : ''}`}>
        <ScissorsAnimatedSVG size={22} />
      </div>
      <div className="sd-line" />
      {label && <span className="sd-label">{label}</span>}
    </div>
  );
};

export default SalonDivider;
