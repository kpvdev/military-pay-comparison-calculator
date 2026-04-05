import { useRef } from 'react';
import { ArrowRightLeft, RotateCcw } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CareerForm } from './components/CareerForm';
import { ResultsCard } from './components/ResultsCard';
import { ComparisonChart } from './components/ComparisonChart';
import { ErrorToast } from './components/ErrorToast';
import { useTheme } from './hooks/useTheme';
import { useCalculator } from './hooks/useCalculator';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    career1, setCareer1, result1, calculate1, clear1,
    career2, setCareer2, result2, calculate2, clear2,
    clearAll, error, setError,
  } = useCalculator();

  const comparisonRef = useRef<HTMLDivElement>(null);

  const handleCompare = () => {
    calculate1();
    calculate2();
    if (career1.rank && career1.yearsOfService && career2.rank && career2.yearsOfService) {
      setTimeout(() => {
        comparisonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Hero />

      <main id="calculator" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Career Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <CareerForm
            label="Career 1"
            career={career1}
            onChange={(u) => setCareer1((p) => ({ ...p, ...u }))}
            onCalculate={calculate1}
            onClear={clear1}
            accent="blue"
          />
          <CareerForm
            label="Career 2"
            career={career2}
            onChange={(u) => setCareer2((p) => ({ ...p, ...u }))}
            onCalculate={calculate2}
            onClear={clear2}
            accent="emerald"
          />
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCompare}
            className="flex items-center gap-2 rounded-xl bg-surface-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-surface-900 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Compare Both Careers
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-6 py-3 text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Start Over
          </button>
        </div>

        {/* Results */}
        {(result1 || result2) && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {result1 && <ResultsCard result={result1} career={career1} label="Career 1" accent="blue" />}
            {result2 && <ResultsCard result={result2} career={career2} label="Career 2" accent="emerald" />}
          </div>
        )}

        {/* Comparison Chart */}
        {result1 && result2 && (
          <div ref={comparisonRef} className="mt-12">
            <ComparisonChart result1={result1} result2={result2} theme={theme} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-700 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-sm text-surface-700 dark:text-surface-200">
            Military Pay Comparison Calculator &middot; Pay data sourced from official DoD pay tables &middot; Not an official government tool
          </p>
        </div>
      </footer>

      {/* Error Toast */}
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
}
