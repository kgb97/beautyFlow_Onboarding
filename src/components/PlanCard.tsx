import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { limitLabel, planBillingNote, planMonthlyPrice, type BillingCycle, type PublicPlanDto } from '../services/plansService';
import './PlanCard.css';

interface Props {
  plan: PublicPlanDto;
  cycle: BillingCycle;
  // Etiqueta destacada arriba de la tarjeta (ej. "Más popular").
  highlight?: string;
  selected?: boolean;
  // Botón/enlace de acción (landing) -- en el selector del registro la tarjeta entera es el botón.
  action?: ReactNode;
  onSelect?: () => void;
}

const PlanCard = ({ plan, cycle, highlight, selected, action, onSelect }: Props) => {
  const price = planMonthlyPrice(plan, cycle);
  const note = planBillingNote(plan, cycle);
  const badge = plan.isTrial ? `Prueba ${plan.trialDurationDays ?? ''} días` : highlight;

  const content = (
    <>
      {badge && <span className={`plan-card-badge${plan.isTrial ? ' is-trial' : ''}`}>{badge}</span>}
      {selected && <span className="plan-card-check" aria-hidden="true"><Check size={16} /></span>}
      <h3>{plan.name}</h3>
      <div className="plan-card-price">
        {price != null ? <>${price}<span>/mes</span></> : 'Gratis'}
      </div>
      {note && <p className="plan-card-note">{note}</p>}
      {plan.description && <p className="plan-card-desc">{plan.description}</p>}
      <ul className="plan-card-limits">
        {plan.limits.map(l => (
          <li key={l.key}><Check size={14} /> {limitLabel(l)}</li>
        ))}
      </ul>
      {action}
    </>
  );

  const cls = `plan-card${selected ? ' selected' : ''}${highlight && !plan.isTrial ? ' featured' : ''}`;
  return onSelect ? (
    <button type="button" className={cls} aria-pressed={selected} onClick={onSelect}>{content}</button>
  ) : (
    <div className={cls}>{content}</div>
  );
};

export default PlanCard;
