import { cn } from "@/shared/utils/cn";

interface LoadingStateProps {
  compact?: boolean;
}

export function LoadingState({ compact }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        compact ? "min-h-[200px]" : "min-h-screen"
      )}
    >
      <div
        className="h-8 w-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"
        aria-hidden
      />
      <span className="text-sm text-gray-500">Loading...</span>
    </div>
  );
}
