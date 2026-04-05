import { useState } from 'react';
import { Trash2, Calculator, MapPin, Search, Check, Copy } from 'lucide-react';
import type { CareerInput } from '../types/pay';
import { RANKS, YEARS_OF_SERVICE, SDAP_LEVELS, CAIP_LEVELS, CALENDAR_YEARS } from '../data/ranks';
import { lookupBAHByZip, searchLocations, bahLocations2024 } from '../data/bah';

interface CareerFormProps {
  label: string;
  career: CareerInput;
  onChange: (updates: Partial<CareerInput>) => void;
  onCalculate: () => void;
  onClear: () => void;
  onCopyToOther: () => void;
  otherLabel: string;
  accent: 'blue' | 'emerald';
}

export function CareerForm({ label, career, onChange, onCalculate, onClear, onCopyToOther, otherLabel, accent }: CareerFormProps) {
  const [bahMode, setBahMode] = useState<'zip' | 'manual'>('zip');
  const [locationSearch, setLocationSearch] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const accentClasses = accent === 'blue'
    ? {
        badge: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
        ring: 'focus:ring-primary-500 focus:border-primary-500',
        btn: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 shadow-primary-600/25',
        toggle: 'bg-primary-600',
      }
    : {
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        ring: 'focus:ring-emerald-500 focus:border-emerald-500',
        btn: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-600/25',
        toggle: 'bg-emerald-600',
      };

  const selectClasses = `w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`;

  const handleZipChange = (zip: string) => {
    onChange({ bahZip: zip });
    if (zip.length === 5 && career.rank) {
      const result = lookupBAHByZip(zip, career.rank, career.withDependents);
      if (result) {
        onChange({ bahZip: zip, bahRate: result.rate, bahLocationName: result.location });
      } else {
        onChange({ bahZip: zip, bahLocationName: '' });
      }
    } else {
      onChange({ bahZip: zip, bahLocationName: '' });
    }
  };

  const handleRankChange = (rank: string) => {
    onChange({ rank });
    // Re-lookup BAH if zip is set
    if (career.bahZip.length === 5 && rank && bahMode === 'zip') {
      const result = lookupBAHByZip(career.bahZip, rank, career.withDependents);
      if (result) {
        onChange({ rank, bahRate: result.rate, bahLocationName: result.location });
      }
    }
  };

  const handleDependentsChange = (withDependents: boolean) => {
    onChange({ withDependents });
    if (career.bahZip.length === 5 && career.rank && bahMode === 'zip') {
      const result = lookupBAHByZip(career.bahZip, career.rank, withDependents);
      if (result) {
        onChange({ withDependents, bahRate: result.rate, bahLocationName: result.location });
      }
    }
  };

  const handleLocationSelect = (mha: string) => {
    const location = bahLocations2024.find((l) => l.mha === mha);
    if (location && career.rank) {
      const rates = career.withDependents ? location.withDependents : location.withoutDependents;
      const rate = rates[career.rank] ?? 0;
      onChange({ bahRate: rate, bahLocationName: location.name, bahZip: '' });
    } else if (location) {
      onChange({ bahLocationName: location.name, bahZip: '' });
    }
    setShowLocationDropdown(false);
    setLocationSearch('');
  };

  const filteredLocations = locationSearch.length > 0
    ? searchLocations(locationSearch)
    : bahLocations2024;

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
            className={selectClasses}
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
            onChange={(e) => handleRankChange(e.target.value)}
            className={selectClasses}
          >
            <option value="">Select pay grade...</option>
            <optgroup label="Enlisted">
              {RANKS.filter((r) => r.category === 'enlisted').map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </optgroup>
            <optgroup label="Warrant Officer">
              {RANKS.filter((r) => r.category === 'warrant').map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </optgroup>
            <optgroup label="Commissioned Officer">
              {RANKS.filter((r) => r.category === 'officer').map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </optgroup>
            <optgroup label="Commissioned Officer (Prior Enlisted)">
              {RANKS.filter((r) => r.category === 'officer_prior').map((r) => (
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
            className={selectClasses}
          >
            <option value="">Select years of service...</option>
            {YEARS_OF_SERVICE.map((y) => (
              <option key={y.value} value={y.value}>{y.label}</option>
            ))}
          </select>
        </div>

        {/* Dependents Toggle */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            Dependency Status
          </label>
          <div className="flex rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
            <button
              type="button"
              onClick={() => handleDependentsChange(false)}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${
                !career.withDependents
                  ? `${accentClasses.toggle} text-white`
                  : 'bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              Without Dependents
            </button>
            <button
              type="button"
              onClick={() => handleDependentsChange(true)}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${
                career.withDependents
                  ? `${accentClasses.toggle} text-white`
                  : 'bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              With Dependents
            </button>
          </div>
        </div>

        {/* BAH Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">
              BAH Rate
            </label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBahMode('zip')}
                className={`px-2.5 py-1 text-xs rounded-l-lg font-medium transition-all ${
                  bahMode === 'zip'
                    ? `${accentClasses.toggle} text-white`
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200'
                }`}
              >
                By Location
              </button>
              <button
                type="button"
                onClick={() => setBahMode('manual')}
                className={`px-2.5 py-1 text-xs rounded-r-lg font-medium transition-all ${
                  bahMode === 'manual'
                    ? `${accentClasses.toggle} text-white`
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200'
                }`}
              >
                Manual
              </button>
            </div>
          </div>

          {bahMode === 'zip' ? (
            <div className="space-y-5">
              {/* Zip Code Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-700 dark:text-surface-200" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Enter ZIP code..."
                  value={career.bahZip}
                  onChange={(e) => handleZipChange(e.target.value.replace(/\D/g, ''))}
                  className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 pl-10 pr-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
                />
              </div>

              {/* Location search dropdown */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-700 dark:text-surface-200" />
                <input
                  type="text"
                  placeholder="Or search by base/city name..."
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  className={`w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 pl-10 pr-4 py-2.5 text-sm text-surface-900 dark:text-white transition-all ${accentClasses.ring} focus:ring-2 focus:outline-none`}
                />
                {showLocationDropdown && (
                  <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-xl">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.mha}
                        type="button"
                        onClick={() => handleLocationSelect(loc.mha)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left text-surface-900 dark:text-white hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-surface-700 dark:text-surface-200" />
                        <span>{loc.name}</span>
                        {career.bahLocationName === loc.name && (
                          <Check className="h-3.5 w-3.5 ml-auto text-accent-500" />
                        )}
                      </button>
                    ))}
                    {filteredLocations.length === 0 && (
                      <div className="px-4 py-3 text-sm text-surface-700 dark:text-surface-200">
                        No matching locations. Try manual entry.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Location match indicator */}
              {career.bahLocationName && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${accentClasses.badge}`}>
                  <MapPin className="h-3.5 w-3.5" />
                  {career.bahLocationName} — {career.bahRate > 0 ? `$${career.bahRate.toLocaleString()}/mo` : 'Select rank to see rate'}
                </div>
              )}
              {career.bahZip.length === 5 && !career.bahLocationName && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  ZIP not found in database. Try searching by name or use manual entry.
                </div>
              )}
            </div>
          ) : (
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
          )}
        </div>

        {/* SDAP */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            SDAP Level
          </label>
          <select
            value={career.sdapLevel}
            onChange={(e) => onChange({ sdapLevel: e.target.value })}
            className={selectClasses}
          >
            {SDAP_LEVELS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* CAIP */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200 mb-1.5">
            CAIP Level
          </label>
          <select
            value={career.caipLevel}
            onChange={(e) => onChange({ caipLevel: e.target.value })}
            className={selectClasses}
          >
            {CAIP_LEVELS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 flex flex-col gap-3">
        <div className="flex gap-3">
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
        <button
          onClick={onCopyToOther}
          className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-2 text-xs font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all focus:outline-none focus:ring-2 focus:ring-surface-200"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy to {otherLabel}
        </button>
      </div>
    </div>
  );
}
