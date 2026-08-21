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
}

export const PlansService = {
  getPlans: async (): Promise<PublicPlanDto[]> => {
    const response = await apiClient.get<PublicPlanDto[]>('/api/public/plans');
    return response.data;
  },
};
