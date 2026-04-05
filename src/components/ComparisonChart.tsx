import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { PayBreakdown } from '../types/pay';
import { formatUSD } from '../utils/calculations';

interface ComparisonChartProps {
  result1: PayBreakdown;
  result2: PayBreakdown;
  theme: 'light' | 'dark';
}

export function ComparisonChart({ result1, result2, theme }: ComparisonChartProps) {
  const data = [
    { name: 'Base Pay', career1: result1.basePay, career2: result2.basePay },
    { name: 'BAS', career1: result1.bas, career2: result2.bas },
    { name: 'BAH', career1: result1.bah, career2: result2.bah },
    { name: 'SDAP', career1: result1.sdap, career2: result2.sdap },
    { name: 'CAIP', career1: result1.caip, career2: result2.caip },
    { name: 'Monthly Gross', career1: result1.monthlyGross, career2: result2.monthlyGross },
  ];

  const diff = result1.annualGross - result2.annualGross;
  const higherLabel = diff > 0 ? 'Career 1' : 'Career 2';
  const absDiff = Math.abs(diff);

  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';
  const textColor = theme === 'dark' ? '#cbd5e1' : '#475569';

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-sm overflow-hidden animate-in">
      <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Pay Comparison</h3>
        <div className="text-right">
          <p className="text-xs text-surface-700 dark:text-surface-200">Annual difference</p>
          <p className={`text-lg font-bold ${diff === 0 ? 'text-surface-900 dark:text-white' : diff > 0 ? 'text-primary-600 dark:text-primary-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {diff === 0 ? 'Equal' : `${higherLabel} earns ${formatUSD(absDiff)} more`}
          </p>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} barGap={4} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              formatter={(value: number) => formatUSD(value)}
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
              }}
            />
            <Legend />
            <Bar name="Career 1" dataKey="career1" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={theme === 'dark' ? '#60a5fa' : '#3b82f6'} />
              ))}
            </Bar>
            <Bar name="Career 2" dataKey="career2" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={theme === 'dark' ? '#34d399' : '#10b981'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-px bg-surface-200 dark:bg-surface-700 border-t border-surface-200 dark:border-surface-700">
        <SummaryCell label="Career 1" monthly={result1.monthlyGross} annual={result1.annualGross} accent="blue" />
        <SummaryCell label="Career 2" monthly={result2.monthlyGross} annual={result2.annualGross} accent="emerald" />
      </div>
    </div>
  );
}

function SummaryCell({ label, monthly, annual, accent }: { label: string; monthly: number; annual: number; accent: 'blue' | 'emerald' }) {
  const dotColor = accent === 'blue' ? 'bg-primary-500' : 'bg-emerald-500';
  return (
    <div className="bg-white dark:bg-surface-900 p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
        <span className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">{label}</span>
      </div>
      <p className="text-2xl font-bold text-surface-900 dark:text-white tabular-nums">{formatUSD(monthly)}</p>
      <p className="text-xs text-surface-700 dark:text-surface-200 mt-0.5">{formatUSD(annual)} / year</p>
    </div>
  );
}
