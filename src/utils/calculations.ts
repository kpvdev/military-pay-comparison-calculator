import type { CareerInput, PayBreakdown } from '../types/pay';
import { basePayByYear, basRates, sdapRates, caipRates } from '../data/pay';
import { RANKS } from '../data/ranks';

const HOURS_PER_MONTH = 160; // 40 hrs/week * 4 weeks
const TAX_RATE = 0.15;

export function calculatePay(input: CareerInput): PayBreakdown | null {
  const { rank, yearsOfService, calendarYear, bahRate, sdapLevel, caipLevel } = input;

  const payTable = basePayByYear[calendarYear];
  if (!payTable) return null;

  const rankData = payTable[rank];
  if (!rankData) return null;

  const basePay = rankData[yearsOfService] ?? 0;
  if (basePay === 0 && rank !== 'E1') return null;

  const rankInfo = RANKS.find((r) => r.value === rank);
  const yearRates = basRates[calendarYear] ?? basRates['2024'];
  const bas = rankInfo?.category === 'officer' ? yearRates.officer : yearRates.enlisted;
  const bah = bahRate;
  const sdap = sdapRates[sdapLevel] ?? 0;
  const caip = caipRates[caipLevel] ?? 0;

  const monthlyGross = basePay + bas + bah + sdap + caip;
  const annualGross = monthlyGross * 12;
  const hourlyGross = monthlyGross / HOURS_PER_MONTH;

  // Only base pay, SDAP, and CAIP are taxable. BAH and BAS are tax-exempt.
  const taxableIncome = basePay + sdap + caip;
  const monthlyTax = taxableIncome * TAX_RATE;
  const monthlyNet = monthlyGross - monthlyTax;
  const annualNet = monthlyNet * 12;
  const hourlyNet = monthlyNet / HOURS_PER_MONTH;

  return {
    basePay,
    bas,
    bah,
    sdap,
    caip,
    monthlyGross,
    annualGross,
    hourlyGross,
    monthlyNet,
    annualNet,
    hourlyNet,
  };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
