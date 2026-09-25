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
  emailAddonPriceMonthly?: number | null;
  whatsAppAddonPriceMonthly?: number | null;
}

// Varias piezas de la landing (planes, FAQ, footer, botón de WhatsApp) leen los mismos
// settings: una sola request por carga de página. Si falla, se descarta para reintentar.
let cached: Promise<PlatformSettingsDto> | null = null;

export const PlatformSettingsService = {
  getSettings: (): Promise<PlatformSettingsDto> => {
    cached ??= apiClient.get<PlatformSettingsDto>('/api/public/settings')
      .then(r => r.data)
      .catch(err => { cached = null; throw err; });
    return cached;
  },
};

// Bancos únicos de las cuentas activas, para decir "transferencia a BAC o Lafise".
export const bankNames = (s: PlatformSettingsDto | null): string[] =>
  [...new Set((s?.paymentAccounts ?? []).map(a => a.bankName).filter(Boolean))];
