import type { BASRates, SDAPRates } from '../../types/pay';

export const basRates: Record<string, BASRates> = {
  '2023': { enlisted: 452.56, officer: 311.88, BASII: 905.12 },
  '2024': { enlisted: 460.25, officer: 317.17, BASII: 920.50 },
};

export const sdapRates: SDAPRates = {
  'SD-0': 0,
  'SD-1': 75.00,
  'SD-2': 150.00,
  'SD-3': 225.00,
  'SD-4': 300.00,
  'SD-5': 375.00,
  'SD-6': 450.00,
};
