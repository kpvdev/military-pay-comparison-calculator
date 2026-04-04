import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import type { PayBreakdown } from '../types/pay';
import { formatUSD } from '../utils/calculations';

interface ResultsCardProps {
  result: PayBreakdown;
  label: string;
  accent: 'blue' | 'emerald';
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-surface-700 dark:text-surface-200">{label}</span>
      <span className="text-sm font-semibold text-surface-900 dark:text-white tabular-nums">{value}</span>
    </div>
  );
}

export function ResultsCard({ result, label, accent }: ResultsCardProps) {
  const accentBorder = accent === 'blue' ? 'border-l-primary-500' : 'border-l-emerald-500';
  const accentIcon = accent === 'blue'
    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400'
    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400';

  return (
    <div className={`rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-sm border-l-4 ${accentBorder} overflow-hidden animate-in`}>
      <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-700">
        <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{label} — Results</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Monthly Entitlements */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${accentIcon}`}>
              <DollarSign className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">Monthly Entitlements</h4>
          </div>
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            <StatRow label="Base Pay" value={formatUSD(result.basePay)} />
            <StatRow label="BAS" value={formatUSD(result.bas)} />
            <StatRow label="BAH" value={formatUSD(result.bah)} />
            <StatRow label="SDAP" value={formatUSD(result.sdap)} />
          </div>
        </div>

        {/* Gross Income */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${accentIcon}`}>
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">Gross Income</h4>
          </div>
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            <StatRow label="Monthly" value={formatUSD(result.monthlyGross)} />
            <StatRow label="Annual" value={formatUSD(result.annualGross)} />
            <StatRow label="Hourly" value={formatUSD(result.hourlyGross)} />
          </div>
        </div>

        {/* Net Income */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${accentIcon}`}>
              <Clock className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">Estimated Net Income</h4>
          </div>
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            <StatRow label="Monthly" value={formatUSD(result.monthlyNet)} />
            <StatRow label="Annual" value={formatUSD(result.annualNet)} />
            <StatRow label="Hourly" value={formatUSD(result.hourlyNet)} />
          </div>
          <p className="mt-2 text-xs text-surface-700 dark:text-surface-200 italic">
            * Estimated at 15% tax rate. Actual taxes vary.
          </p>
        </div>
      </div>
    </div>
  );
}
