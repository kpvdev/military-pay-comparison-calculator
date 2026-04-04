import { Moon, Sun, Shield } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-200 dark:border-surface-700 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/25">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-surface-900 dark:text-white">
                MilPay Compare
              </h1>
              <p className="text-xs text-surface-700 dark:text-surface-200 -mt-0.5">
                Military Pay Comparison Calculator
              </p>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
