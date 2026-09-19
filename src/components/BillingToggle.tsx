import type { BillingCycle } from '../services/plansService';
import './PlanCard.css';

interface Props {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  savingsPercent?: number | null;
}

const BillingToggle = ({ value, onChange, savingsPercent }: Props) => (
  <div className="billing-toggle" role="group" aria-label="Ciclo de facturación">
    <button type="button" className={value === 'Monthly' ? 'active' : ''} aria-pressed={value === 'Monthly'} onClick={() => onChange('Monthly')}>
      Mensual
    </button>
    <button type="button" className={value === 'Annual' ? 'active' : ''} aria-pressed={value === 'Annual'} onClick={() => onChange('Annual')}>
      Anual{savingsPercent ? <span className="billing-toggle-save">-{savingsPercent}%</span> : null}
    </button>
  </div>
);

export default BillingToggle;
