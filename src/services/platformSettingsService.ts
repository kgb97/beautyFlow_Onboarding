import { apiClient } from './apiClient';

export interface PaymentAccountDto {
  id: string;
  label: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  instructions?: string | null;
}

export interface PlatformSettingsDto {
  whatsappNumber: string;
  supportEmail?: string | null;
  supportPhone?: string | null;
  paymentAccounts: PaymentAccountDto[];
}

export const PlatformSettingsService = {
  getSettings: async (): Promise<PlatformSettingsDto> => {
    const response = await apiClient.get<PlatformSettingsDto>('/api/public/settings');
    return response.data;
  },
};
