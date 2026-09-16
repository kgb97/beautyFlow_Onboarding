import { apiClient } from './apiClient';

export interface PublicPlanDto {
  id: string;
  name: string;
  description?: string | null;
  priceMonthly: number | null;
  isTrial: boolean;
  trialDurationDays?: number | null;
  maxBranches: number | null;
  maxStaff: number | null;
  maxActiveServices: number | null;
  maxClients: number | null;
  maxAppointmentsPerMonth: number | null;
  billingCycle: 'Monthly' | 'Annual';
  priceAnnual: number | null;
}

export const PlansService = {
  getPlans: async (): Promise<PublicPlanDto[]> => {
    const response = await apiClient.get<PublicPlanDto[]>('/api/public/plans');
    return response.data;
  },
};

// "$49/mes" siempre (para Annual, priceMonthly es solo el precio mostrado); annualNote
// = "Facturado $588/año" solo si el plan es de ciclo anual -- nunca inventar el dato si
// el plan no trae priceAnnual cargado.
export function planPriceLabel(plan: Pick<PublicPlanDto, 'priceMonthly'>): string {
  return plan.priceMonthly && plan.priceMonthly > 0 ? `$${plan.priceMonthly}` : 'Gratis';
}

export function planAnnualNote(plan: Pick<PublicPlanDto, 'billingCycle' | 'priceAnnual'>): string | null {
  return plan.billingCycle === 'Annual' && plan.priceAnnual != null
    ? `Facturado $${plan.priceAnnual}/año`
    : null;
}
