import { apiClient } from './apiClient';

export interface OnboardingRequest {
  planId: string;
  billingCycle?: 'Monthly' | 'Annual';
  companyName: string;
  ruc: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
  companyCountryCode?: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPassword: string;
  acceptedTermsVersion?: string;
  // Código del link de referidos (?ref=); la API ignora uno que no existe.
  referralCode?: string;
}

// El link de referidos puede caer en la portada o directo en /registro: se guarda al entrar
// para que sobreviva la navegación hasta el registro.
const REF_KEY = 'izisalon_ref';
export const rememberReferral = () => {
  try {
    const ref = new URLSearchParams(window.location.search).get('ref')?.trim();
    if (ref) sessionStorage.setItem(REF_KEY, ref.slice(0, 12));
  } catch { /* sin storage: el link solo vale si se registra en la misma página */ }
};
export const referralCode = (): string | undefined => {
  try { return sessionStorage.getItem(REF_KEY) ?? undefined; } catch { return undefined; }
};

export interface OnboardingResponse {
  companyId: string;
  companyName: string;
  token: string;
  email: string;
  fullName: string;
  message: string;
  isPaymentPending: boolean;
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
