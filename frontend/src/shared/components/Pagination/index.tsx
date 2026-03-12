import { cn } from "@/shared/utils/cn";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, total, limit, onPageChange, className }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      className={cn("flex flex-wrap items-center justify-between gap-2", className)}
      aria-label="Pagination"
    >
      <span className="text-xs sm:text-sm text-gray-600">
        Page {page} of {totalPages} ({total} total)
      </span>
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          className="px-3 py-1 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="px-3 py-1 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
