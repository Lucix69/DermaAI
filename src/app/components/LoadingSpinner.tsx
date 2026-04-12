import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <Loader2 className="w-20 h-20 absolute -top-2 -left-2 text-primary animate-spin" />
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
