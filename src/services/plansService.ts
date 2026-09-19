import { apiClient } from './apiClient';

export type BillingCycle = 'Monthly' | 'Annual';

export interface PlanLimitDto {
  key: string;
  label: string;
  max: number | null;
}

// Un solo shape de plan; los límites llegan como lista y se recorren sin conocer cada
// uno (ver PlanDto.cs / PlanLimits.cs en el API).
export interface PublicPlanDto {
  id: string;
  tier: string;
  name: string;
  description?: string | null;
  isTrial: boolean;
  trialDurationDays?: number | null;
  priceMonthly: number | null;
  priceAnnual: number | null;
  annualMonthlyEquivalent: number | null;
  annualSavingsPercent: number | null;
  limits: PlanLimitDto[];
}

export const PlansService = {
  getPlans: async (): Promise<PublicPlanDto[]> => {
    const response = await apiClient.get<PublicPlanDto[]>('/api/public/plans');
    return response.data;
  },
};

export const offersAnnual = (plan: PublicPlanDto) => plan.priceAnnual != null && !plan.isTrial;

// Ciclo efectivo: anual solo si el plan lo ofrece, si no cae a mensual.
export const effectiveCycle = (plan: PublicPlanDto, cycle: BillingCycle): BillingCycle =>
  cycle === 'Annual' && offersAnnual(plan) ? 'Annual' : 'Monthly';

// Precio "por mes" que se muestra en grande; null = plan gratuito.
export function planMonthlyPrice(plan: PublicPlanDto, cycle: BillingCycle): number | null {
  const price = effectiveCycle(plan, cycle) === 'Annual' ? plan.annualMonthlyEquivalent : plan.priceMonthly;
  return price && price > 0 ? price : null;
}

// Nota de facturación: "Facturado $360/año" solo en ciclo anual; nunca se inventa el dato.
export function planBillingNote(plan: PublicPlanDto, cycle: BillingCycle): string | null {
  if (effectiveCycle(plan, cycle) !== 'Annual') return null;
  return `Facturado $${plan.priceAnnual}/año${plan.annualSavingsPercent ? ` · ahorras ${plan.annualSavingsPercent}%` : ''}`;
}

export function limitLabel(limit: PlanLimitDto): string {
  return limit.max == null ? `${limit.label}: ilimitado` : `${limit.max} ${limit.label.toLowerCase()}`;
}
