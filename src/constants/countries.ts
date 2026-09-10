// Espejo de IziSalon.Application.Common.Countries en el backend -- lista corta y
// real (no las 195 del mundo), no un endpoint aparte para esto.
export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'NI', name: 'Nicaragua', dialCode: '505' },
  { code: 'CR', name: 'Costa Rica', dialCode: '506' },
  { code: 'HN', name: 'Honduras', dialCode: '504' },
  { code: 'SV', name: 'El Salvador', dialCode: '503' },
  { code: 'GT', name: 'Guatemala', dialCode: '502' },
  { code: 'PA', name: 'Panamá', dialCode: '507' },
  { code: 'MX', name: 'México', dialCode: '52' },
  { code: 'US', name: 'Estados Unidos', dialCode: '1' },
  { code: 'ES', name: 'España', dialCode: '34' },
  { code: 'CO', name: 'Colombia', dialCode: '57' },
];

export const DEFAULT_COUNTRY = 'NI';
