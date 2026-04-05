export interface CareerInput {
  rank: string;
  yearsOfService: string;
  calendarYear: string;
  bahRate: number;
  bahZip: string;
  bahLocationName: string;
  withDependents: boolean;
  sdapLevel: string;
}

export interface PayBreakdown {
  basePay: number;
  bas: number;
  bah: number;
  sdap: number;
  monthlyGross: number;
  annualGross: number;
  hourlyGross: number;
  monthlyNet: number;
  annualNet: number;
  hourlyNet: number;
}

export interface RankInfo {
  value: string;
  label: string;
  category: 'enlisted' | 'officer';
}

export type BasePay = Record<string, Record<string, number>>;
export type BASRates = { enlisted: number; officer: number; BASII: number };
export type SDAPRates = Record<string, number>;
