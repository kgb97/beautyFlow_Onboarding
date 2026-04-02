import { apiClient } from './apiClient';

export interface OnboardingRequest {
  companyName: string;
  ruc: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPassword: string;
}

export interface OnboardingResponse {
  companyId: string;
  companyName: string;
  token: string;
  email: string;
  fullName: string;
  message: string;
}

export const OnboardingService = {
  /**
   * Registers a new salon and its owner
   */
  registerSalon: async (data: OnboardingRequest): Promise<OnboardingResponse> => {
    const response = await apiClient.post<OnboardingResponse>('/api/public/onboarding', data);
    return response.data;
  }
};
