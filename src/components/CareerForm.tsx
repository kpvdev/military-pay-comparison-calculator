import { Trash2, Calculator } from 'lucide-react';
import type { CareerInput } from '../types/pay';
import { RANKS, YEARS_OF_SERVICE, SDAP_LEVELS, CALENDAR_YEARS } from '../data/ranks';

interface CareerFormProps {
  label: string;
  career: CareerInput;
  onChange: (updates: Partial<CareerInput>) => void;
  onCalculate: () => void;
  onClear: () => void;
  accent: 'blue' | 'emerald';
}

export function CareerForm({ label, career, onChange, onCalculate, onClear, accent }: CareerFormProps) {
  const accentClasses = accent === 'blue'
    ? {
        badge: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
        ring: 'focus:ring-primary-500 focus:border-primary-500',
        btn: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 shadow-primary-600/25',
      }
    : {
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        ring: 'focus:ring-emerald-500 focus:border-emerald-500',
        btn: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-600/25',
      };

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-700">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${accentClasses.badge}`}>
          {label}
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* Calendar Year */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            Calendar Year
          </label>
          <select
            value={career.calendarYear}
            onChange={(e) => onChange({ calendarYear: e.target.value })}
            className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
          >
            {CALENDAR_YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Rank */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            Rank
          </label>
          <select
            value={career.rank}
            onChange={(e) => onChange({ rank: e.target.value })}
            className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
          >
            <option value="">Select rank...</option>
            <optgroup label="Enlisted">
              {RANKS.filter((r) => r.category === 'enlisted').map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </optgroup>
            <optgroup label="Officer (Prior Enlisted)">
              {RANKS.filter((r) => r.category === 'officer').map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Years of Service */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            Years of Service
          </label>
          <select
            value={career.yearsOfService}
            onChange={(e) => onChange({ yearsOfService: e.target.value })}
            className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
          >
            <option value="">Select years of service...</option>
            {YEARS_OF_SERVICE.map((y) => (
              <option key={y.value} value={y.value}>{y.label}</option>
            ))}
          </select>
        </div>

        {/* BAH Rate */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            BAH Rate (Monthly)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-700 dark:text-surface-200 text-sm">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={career.bahRate || ''}
              onChange={(e) => onChange({ bahRate: parseFloat(e.target.value) || 0 })}
              className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 pl-8 pr-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
            />
          </div>
        </div>

        {/* SDAP */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            SDAP Level
          </label>
          <select
            value={career.sdapLevel}
            onChange={(e) => onChange({ sdapLevel: e.target.value })}
            className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
          >
            {SDAP_LEVELS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 flex gap-3">
        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-2.5 text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all focus:outline-none focus:ring-2 focus:ring-surface-200"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
        <button
          onClick={onCalculate}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentClasses.btn}`}
        >
          <Calculator className="h-4 w-4" />
          Calculate
        </button>
      </div>
    </div>
  );
}
