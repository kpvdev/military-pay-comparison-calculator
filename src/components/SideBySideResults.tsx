import { DollarSign, TrendingUp, User, MapPin, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import type { PayBreakdown, CareerInput } from '../types/pay';
import { formatUSD } from '../utils/calculations';
import { RANKS, YEARS_OF_SERVICE } from '../data/ranks';

interface SideBySideResultsProps {
  result1: PayBreakdown;
  result2: PayBreakdown;
  career1: CareerInput;
  career2: CareerInput;
}

function DiffIndicator({ val1, val2 }: { val1: number; val2: number }) {
  const diff = val1 - val2;
  if (Math.abs(diff) < 0.01) {
    return <Minus className="h-3 w-3 text-surface-700 dark:text-surface-200" />;
  }
  if (diff > 0) {
    return <ArrowUp className="h-3 w-3 text-primary-500" />;
  }
  return <ArrowDown className="h-3 w-3 text-emerald-500" />;
}

function CompareRow({ label, val1, val2, bold }: { label: string; val1: number; val2: number; bold?: boolean }) {
  const higher = val1 > val2 ? 1 : val2 > val1 ? 2 : 0;
  const textClass = bold ? 'font-bold text-base' : 'text-sm font-semibold';
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2.5 ${bold ? 'border-t-2 border-surface-200 dark:border-surface-700 pt-3' : ''}`}>
      <div className="text-right">
        <span className={`tabular-nums ${textClass} ${higher === 1 ? 'text-primary-600 dark:text-primary-400' : 'text-surface-900 dark:text-white'}`}>
          {formatUSD(val1)}
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5 min-w-[80px]">
        <span className="text-xs text-surface-700 dark:text-surface-200 text-center leading-tight">{label}</span>
        <DiffIndicator val1={val1} val2={val2} />
      </div>
      <div className="text-left">
        <span className={`tabular-nums ${textClass} ${higher === 2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-surface-900 dark:text-white'}`}>
          {formatUSD(val2)}
        </span>
      </div>
    </div>
  );
}

function CareerHeader({ career, accent }: { career: CareerInput; accent: 'blue' | 'emerald' }) {
  const rankLabel = RANKS.find((r) => r.value === career.rank)?.label ?? career.rank;
  const yosLabel = YEARS_OF_SERVICE.find((y) => y.value === career.yearsOfService)?.label ?? `${career.yearsOfService} years`;
  const badgeClass = accent === 'blue'
    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
  const dotClass = accent === 'blue' ? 'bg-primary-500' : 'bg-emerald-500';
  const align = accent === 'blue' ? 'items-end text-right' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${align}`}>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${badgeClass}`}>
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
        {accent === 'blue' ? 'Career 1' : 'Career 2'}
      </div>
      <p className="text-lg font-bold text-surface-900 dark:text-white mt-2">{rankLabel}</p>
      <p className="text-xs text-surface-700 dark:text-surface-200 mt-0.5">{yosLabel}</p>
      {career.bahLocationName && (
        <span className="inline-flex items-center gap-1 text-xs text-surface-700 dark:text-surface-200 mt-0.5">
          <MapPin className="h-3 w-3 shrink-0" />
          {career.bahLocationName}
        </span>
      )}
    </div>
  );
}

function SectionIcon({ icon: Icon, label, accentIcon }: { icon: typeof DollarSign; label: string; accentIcon: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${accentIcon}`}>
        <Icon className="h-3 w-3" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">{label}</span>
    </div>
  );
}

export function SideBySideResults({ result1, result2, career1, career2 }: SideBySideResultsProps) {
  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-sm overflow-hidden animate-in">
      {/* Header with career details */}
      <div className="px-6 py-5 border-b border-surface-200 dark:border-surface-700">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <CareerHeader career={career1} accent="blue" />
          <div className="flex items-center justify-center">
            <span className="text-xs font-bold text-surface-700 dark:text-surface-200 uppercase tracking-widest">vs</span>
          </div>
          <CareerHeader career={career2} accent="emerald" />
        </div>
      </div>

      <div className="px-6 py-2">
        {/* Monthly Entitlements */}
        <SectionIcon icon={DollarSign} label="Monthly Entitlements" accentIcon="bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-200" />
        <div className="divide-y divide-surface-100 dark:divide-surface-800">
          <CompareRow label="Base Pay" val1={result1.basePay} val2={result2.basePay} />
          <CompareRow label="BAS" val1={result1.bas} val2={result2.bas} />
          <CompareRow label="BAH" val1={result1.bah} val2={result2.bah} />
          <CompareRow label="SDAP" val1={result1.sdap} val2={result2.sdap} />
        </div>

        {/* Gross Income */}
        <SectionIcon icon={TrendingUp} label="Gross Income" accentIcon="bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-200" />
        <div className="divide-y divide-surface-100 dark:divide-surface-800">
          <CompareRow label="Monthly" val1={result1.monthlyGross} val2={result2.monthlyGross} bold />
          <CompareRow label="Annual" val1={result1.annualGross} val2={result2.annualGross} bold />
          <CompareRow label="Hourly" val1={result1.hourlyGross} val2={result2.hourlyGross} />
        </div>

        {/* Net Income */}
        <SectionIcon icon={User} label="Estimated Net Income" accentIcon="bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-200" />
        <div className="divide-y divide-surface-100 dark:divide-surface-800">
          <CompareRow label="Monthly" val1={result1.monthlyNet} val2={result2.monthlyNet} bold />
          <CompareRow label="Annual" val1={result1.annualNet} val2={result2.annualNet} bold />
          <CompareRow label="Hourly" val1={result1.hourlyNet} val2={result2.hourlyNet} />
        </div>

        <p className="mt-3 mb-4 text-xs text-surface-700 dark:text-surface-200 italic text-center">
          * Net income estimated at 15% tax rate. Actual taxes vary.
        </p>
      </div>

      {/* Difference Summary Banner */}
      <DifferenceBanner result1={result1} result2={result2} />
    </div>
  );
}

function DifferenceBanner({ result1, result2 }: { result1: PayBreakdown; result2: PayBreakdown }) {
  const monthlyDiff = result1.monthlyGross - result2.monthlyGross;
  const annualDiff = result1.annualGross - result2.annualGross;
  const absDiff = Math.abs(annualDiff);
  const absMonthly = Math.abs(monthlyDiff);

  if (Math.abs(annualDiff) < 0.01) {
    return (
      <div className="px-6 py-4 bg-surface-50 dark:bg-surface-800/50 border-t border-surface-200 dark:border-surface-700 text-center">
        <p className="text-sm font-semibold text-surface-900 dark:text-white">Both careers pay equally</p>
      </div>
    );
  }

  const higher = annualDiff > 0 ? 'Career 1' : 'Career 2';
  const bannerBg = annualDiff > 0
    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800'
    : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800';
  const textColor = annualDiff > 0
    ? 'text-primary-700 dark:text-primary-300'
    : 'text-emerald-700 dark:text-emerald-300';

  return (
    <div className={`px-6 py-4 border-t ${bannerBg}`}>
      <div className="text-center">
        <p className={`text-sm font-semibold ${textColor}`}>
          {higher} earns <span className="text-lg font-bold">{formatUSD(absMonthly)}/mo</span> more
        </p>
        <p className={`text-xs mt-0.5 ${textColor} opacity-75`}>
          {formatUSD(absDiff)} more per year
        </p>
      </div>
    </div>
  );
}
