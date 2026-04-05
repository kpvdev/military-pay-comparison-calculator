import type { RankInfo } from '../types/pay';

export const RANKS: RankInfo[] = [
  { value: 'E1', label: 'E-1', category: 'enlisted' },
  { value: 'E2', label: 'E-2', category: 'enlisted' },
  { value: 'E3', label: 'E-3', category: 'enlisted' },
  { value: 'E4', label: 'E-4', category: 'enlisted' },
  { value: 'E5', label: 'E-5', category: 'enlisted' },
  { value: 'E6', label: 'E-6', category: 'enlisted' },
  { value: 'E7', label: 'E-7', category: 'enlisted' },
  { value: 'E8', label: 'E-8', category: 'enlisted' },
  { value: 'E9', label: 'E-9', category: 'enlisted' },
  { value: 'O1E', label: 'O-1E', category: 'officer' },
  { value: 'O2E', label: 'O-2E', category: 'officer' },
  { value: 'O3E', label: 'O-3E', category: 'officer' },
];

export const YEARS_OF_SERVICE = [
  { value: '0', label: 'Less than 2 years' },
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
  { value: '4', label: '4 years' },
  { value: '6', label: '6 years' },
  { value: '8', label: '8 years' },
  { value: '10', label: '10 years' },
  { value: '12', label: '12 years' },
  { value: '14', label: '14 years' },
  { value: '16', label: '16 years' },
  { value: '18', label: '18 years' },
  { value: '20', label: '20 years' },
  { value: '22', label: '22 years' },
  { value: '24', label: '24 years' },
  { value: '26', label: '26 years' },
  { value: '28', label: '28 years' },
  { value: '30', label: '30 years' },
  { value: '32', label: '32 years' },
  { value: '34', label: '34 years' },
  { value: '36', label: '36 years' },
  { value: '38', label: '38 years' },
  { value: '40', label: '40 years' },
];

export const SDAP_LEVELS = [
  { value: 'SD-0', label: 'None' },
  { value: 'SD-1', label: 'SD-1 — $75/mo' },
  { value: 'SD-2', label: 'SD-2 — $150/mo' },
  { value: 'SD-3', label: 'SD-3 — $225/mo' },
  { value: 'SD-4', label: 'SD-4 — $300/mo' },
  { value: 'SD-5', label: 'SD-5 — $375/mo' },
  { value: 'SD-6', label: 'SD-6 — $450/mo' },
];

export const CALENDAR_YEARS = ['2024', '2023'];
