import { useMemo } from 'react';
import SalonChairSVG from './svg/SalonChairSVG';

interface SalonBuddyProps {
  focusedField: boolean;
  hasErrors: boolean;
  progress: number;
}

const SalonBuddy = ({ focusedField, hasErrors, progress }: SalonBuddyProps) => {
  const animationClass = useMemo(() => {
    if (progress >= 1) return 'buddy-celebrate';
    if (hasErrors) return 'buddy-shake';
    if (focusedField) return 'buddy-lean';
    return 'buddy-idle';
  }, [focusedField, hasErrors, progress]);

  return (
    <div
      className={`salon-buddy ${animationClass}`}
      title={progress >= 1 ? '¡Formulario completo!' : hasErrors ? 'Revisa los campos' : focusedField ? '¡Sigue así!' : 'Completa tu registro'}
      style={{
        position: 'absolute',
        top: 8,
        right: 16,
        zIndex: 5,
        transition: 'transform 0.3s ease, filter 0.3s ease',
        filter: progress >= 1 ? 'drop-shadow(0 0 12px rgba(219, 39, 119, 0.5))' : hasErrors ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.3))' : 'none',
      }}
    >
      <SalonChairSVG size={56} />
    </div>
  );
};

export default SalonBuddy;
