import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PlansService, effectiveCycle, offersAnnual, type BillingCycle, type PublicPlanDto } from '../services/plansService';
import { bankNames, type PlatformSettingsDto } from '../services/platformSettingsService';
import PlanCard from './PlanCard';
import BillingToggle from './BillingToggle';
import './PlansSection.css';

interface Props {
  settings: PlatformSettingsDto | null;
}

const PlansSection = ({ settings }: Props) => {
  const [plans, setPlans] = useState<PublicPlanDto[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [cycle, setCycle] = useState<BillingCycle>('Monthly');

  useEffect(() => {
    PlansService.getPlans()
      .then(p => { setPlans(p); setStatus(p.length ? 'ready' : 'error'); })
      .catch(() => setStatus('error'));
  }, []);

  const annualPlans = plans.filter(offersAnnual);
  const bestSavings = Math.max(0, ...annualPlans.map(p => p.annualSavingsPercent ?? 0));
  const banks = bankNames(settings);
  const waPrice = settings?.whatsAppAddonPriceMonthly;

  return (
    <section className="plans-section section" id="planes">
      <div className="container">
        <div className="section-header text-center">
          <h2>Precios claros, sin sorpresas</h2>
          <p>Probá 15 días gratis. Después elegís el plan que te quede y lo cambiás cuando quieras.</p>
          {annualPlans.length > 0 && (
            <div className="plans-toggle-wrap">
              <BillingToggle value={cycle} onChange={setCycle} savingsPercent={bestSavings || null} />
            </div>
          )}
        </div>

        {status === 'loading' && (
          <div className="plans-loading" role="status"><Loader2 className="spin" size={28} /><span className="sr-only">Cargando planes</span></div>
        )}

        {status === 'error' && (
          <p className="plans-error">
            No pudimos cargar los precios ahora mismo.{' '}
            {settings?.whatsappNumber
              ? <a href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, quiero saber los precios de iziSalon.')}`} target="_blank" rel="noreferrer">Preguntanos por WhatsApp</a>
              : 'Recargá la página en un momento.'}
          </p>
        )}

        {status === 'ready' && (
          <>
            <div className="plans-section-grid">
              {plans.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  cycle={cycle}
                  highlight={plan.tier === 'Profesional' ? 'Más elegido' : undefined}
                  action={
                    <Link
                      to={`/registro?plan=${plan.id}&cycle=${effectiveCycle(plan, cycle)}`}
                      className={`btn ${plan.isTrial ? 'btn-primary' : 'btn-outline'} plan-showcase-cta`}
                    >
                      {plan.isTrial ? 'Probar gratis' : `Elegir ${plan.name}`} <ArrowRight size={16} />
                    </Link>
                  }
                />
              ))}
            </div>
            <ul className="plans-fineprint">
              <li>Precios en dólares (USD), sin contrato. Cancelás cuando quieras.</li>
              {banks.length > 0 && <li>Pagás por transferencia a {banks.join(' o ')}.</li>}
              <li>
                Confirmaciones y recordatorios por WhatsApp: complemento opcional
                {waPrice ? <> de <strong>${waPrice}/mes</strong></> : null} para cualquier plan.
              </li>
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default PlansSection;
