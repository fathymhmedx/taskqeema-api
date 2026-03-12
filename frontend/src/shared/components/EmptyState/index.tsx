import type { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  action?: ReactNode;
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <p className="text-gray-600">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
