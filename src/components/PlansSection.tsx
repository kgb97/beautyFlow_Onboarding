import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PlansService, effectiveCycle, offersAnnual, type BillingCycle, type PublicPlanDto } from '../services/plansService';
import PlanCard from './PlanCard';
import BillingToggle from './BillingToggle';
import ScrollReveal from './ScrollReveal';
import './PlansSection.css';

const PlansSection = () => {
  const [plans, setPlans] = useState<PublicPlanDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cycle, setCycle] = useState<BillingCycle>('Monthly');

  useEffect(() => {
    PlansService.getPlans()
      .then(setPlans)
      .catch(() => setPlans([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && plans.length === 0) return null;

  const annualPlans = plans.filter(offersAnnual);
  const bestSavings = Math.max(0, ...annualPlans.map(p => p.annualSavingsPercent ?? 0));

  return (
    <section className="plans-section section" id="planes">
      <div className="container">
        <ScrollReveal animation="fade-in">
          <div className="section-header text-center">
            <h2>Planes para cada etapa de tu salón</h2>
            <p>Elige el que se ajuste a tu negocio hoy. Puedes cambiarlo cuando quieras.</p>
            {annualPlans.length > 0 && (
              <div className="plans-toggle-wrap">
                <BillingToggle value={cycle} onChange={setCycle} savingsPercent={bestSavings || null} />
              </div>
            )}
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="plans-loading"><Loader2 className="spin" size={28} /></div>
        ) : (
          <div className="plans-section-grid">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.id} animation="fade-in" delay={i + 1}>
                <PlanCard
                  plan={plan}
                  cycle={cycle}
                  highlight={plan.tier === 'Profesional' ? 'Más popular' : undefined}
                  action={
                    <Link
                      to={`/registro?plan=${plan.id}&cycle=${effectiveCycle(plan, cycle)}`}
                      className={`btn ${plan.tier === 'Profesional' ? 'btn-primary' : 'btn-outline'} plan-showcase-cta`}
                    >
                      Elegir {plan.name} <ArrowRight size={16} />
                    </Link>
                  }
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlansSection;
