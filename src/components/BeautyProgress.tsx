import { useMemo } from 'react';
import ScissorsAnimatedSVG from './svg/ScissorsAnimatedSVG';
import MirrorSVG from './svg/MirrorSVG';
import CombSVG from './svg/CombSVG';
import NailPolishSVG from './svg/NailPolishSVG';
import SparkleSVG from './svg/SparkleSVG';

interface BeautyProgressProps {
  completed: number;
  total: number;
}

const TOOLS = [
  { icon: ScissorsAnimatedSVG, label: 'Datos', key: 'scissors' },
  { icon: CombSVG, label: 'Contacto', key: 'comb' },
  { icon: MirrorSVG, label: 'Admin', key: 'mirror' },
  { icon: NailPolishSVG, label: 'Seguridad', key: 'nail' },
  { icon: SparkleSVG, label: '¡Listo!', key: 'sparkle' },
];

const BeautyProgress = ({ completed, total }: BeautyProgressProps) => {
  const steps = useMemo(() => {
    const fraction = total > 0 ? completed / total : 0;
    return TOOLS.map((tool, i) => ({
      ...tool,
      active: i / TOOLS.length <= fraction,
      isLast: i === TOOLS.length - 1,
    }));
  }, [completed, total]);

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getMessage = () => {
    if (pct === 0) return '¡Empecemos!';
    if (pct < 30) return '¡Buen inicio!';
    if (pct < 60) return '¡Sigue así!';
    if (pct < 90) return '¡Mitad del camino!';
    if (pct < 100) return '¡Casi listo!';
    return '¡Completo! ✨';
  };

  return (
    <div className="beauty-progress">
      <div className="bp-header">
        <span className="bp-label">{getMessage()}</span>
        <span className="bp-pct">{pct}%</span>
      </div>
      <div className="bp-tools">
        {steps.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.key}
              className={`bp-tool ${tool.active ? 'active' : ''} ${tool.isLast && pct >= 100 ? 'complete' : ''}`}
              title={tool.label}
            >
              <Icon size={20} />
            </div>
          );
        })}
      </div>
      <div className="bp-track">
        <div className="bp-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default BeautyProgress;
