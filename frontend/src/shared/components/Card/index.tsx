import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-md border border-gray-200 shadow-card overflow-hidden min-w-0",
        className
      )}
    >
      {title && (
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{title}</h2>
        </div>
      )}
      <div className="p-3 sm:p-4 min-w-0">{children}</div>
    </div>
  );
}
