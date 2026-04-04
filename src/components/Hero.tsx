import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Compare Your
            <span className="block text-primary-200">Military Pay</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto">
            Calculate and compare two military career paths side by side.
            See base pay, allowances, and total compensation at a glance.
          </p>
          <div className="mt-8">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-all hover:scale-105 active:scale-95"
            >
              Start Comparing
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-50 dark:from-surface-950" />
    </section>
  );
}
