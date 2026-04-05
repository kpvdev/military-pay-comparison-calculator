import type { BASRates, SDAPRates, CAIPRates } from '../../types/pay';

export const basRates: Record<string, BASRates> = {
  '2023': { enlisted: 452.56, officer: 311.88, BASII: 905.12 },
  '2024': { enlisted: 460.25, officer: 317.17, BASII: 920.50 },
  '2026': { enlisted: 475.18, officer: 327.45, BASII: 950.36 },
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

export const caipRates: CAIPRates = {
  'CAIP-0': 0,
  'CAIP-B': 1000.00,
  'CAIP-S': 1250.00,
  'CAIP-M': 1500.00,
};
