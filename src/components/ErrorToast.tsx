import { AlertCircle, X } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export function ErrorToast({ message, onClose }: ErrorToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in max-w-sm">
      <div className="flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/50 p-4 shadow-lg">
        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
