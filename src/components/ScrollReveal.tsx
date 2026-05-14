import { type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'slide-up' | 'slide-right' | 'slide-left' | 'bounce-in' | 'fade-in';
  delay?: number;
}

const ScrollReveal = ({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
}: ScrollRevealProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  const animationClass = isInView ? `animate-${animation}` : '';
  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${className} ${animationClass} ${delayClass}`}
      style={{
        opacity: isInView ? undefined : 0,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
