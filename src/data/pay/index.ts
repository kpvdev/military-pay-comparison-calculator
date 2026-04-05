import type { BasePay } from '../../types/pay';
import { basePay2023 } from './2023-base-pay';
import { basePay2024 } from './2024-base-pay';

export { basRates, sdapRates, caipRates } from './rates';

export const basePayByYear: Record<string, BasePay> = {
  '2023': basePay2023,
  '2024': basePay2024,
};
