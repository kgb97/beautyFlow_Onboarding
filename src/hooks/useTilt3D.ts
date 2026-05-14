import { useRef, useCallback } from 'react';

export function useTilt3D(intensity: number = 10) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -intensity;
    const rotateY = (x - 0.5) * intensity;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.5s ease';
    setTimeout(() => { if (el) el.style.transition = ''; }, 500);
  }, []);

  const tiltRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el;
  }, []);

  return { tiltRef, onMouseMove, onMouseLeave };
}
