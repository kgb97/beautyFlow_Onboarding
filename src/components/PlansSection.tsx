import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { PlansService, type PublicPlanDto } from '../services/plansService';
import ScrollReveal from './ScrollReveal';
import './PlansSection.css';

const PlansSection = () => {
  const [plans, setPlans] = useState<PublicPlanDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PlansService.getPlans()
      .then(setPlans)
      .catch(() => setPlans([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && plans.length === 0) return null;

  return (
    <section className="plans-section section" id="planes">
      <div className="container">
        <ScrollReveal animation="fade-in">
          <div className="section-header text-center">
            <h2>Planes para cada etapa de tu salón</h2>
            <p>Elegí el que se ajuste a tu negocio hoy. Podés cambiarlo cuando quieras.</p>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="plans-loading"><Loader2 className="spin" size={28} /></div>
        ) : (
          <div className="plans-section-grid">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.id} animation="fade-in" delay={i + 1}>
                <div className="plan-showcase-card glass-panel">
                  {plan.isTrial && <span className="plan-showcase-trial">Prueba {plan.trialDurationDays ?? ''} días</span>}
                  <h3>{plan.name}</h3>
                  <div className="plan-showcase-price">
                    {plan.priceMonthly && plan.priceMonthly > 0 ? <>${plan.priceMonthly}<span>/mes</span></> : 'Gratis'}
                  </div>
                  {plan.description && <p className="plan-showcase-desc">{plan.description}</p>}
                  <ul className="plan-showcase-limits">
                    <li><Check size={14} /> {plan.maxBranches ?? 'Ilimitadas'} sucursal(es)</li>
                    <li><Check size={14} /> {plan.maxStaff ?? 'Ilimitado'} miembros de staff</li>
                    <li><Check size={14} /> {plan.maxClients ?? 'Ilimitados'} clientes</li>
                    <li><Check size={14} /> {plan.maxAppointmentsPerMonth ?? 'Ilimitadas'} citas por mes</li>
                  </ul>
                  <Link to={`/registro?plan=${plan.id}`} className="btn btn-outline plan-showcase-cta">
                    Elegir {plan.name} <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlansSection;
