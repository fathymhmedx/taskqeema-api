import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-md shadow-card w-full max-w-[calc(100vw-1.5rem)] sm:max-w-md max-h-[85vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 border-b border-gray-200 shrink-0">
          <h2 id="modal-title" className="text-base sm:text-lg font-semibold text-gray-800 truncate">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-medium"
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto px-3 py-2.5 sm:px-4 sm:py-3 min-h-0">{children}</div>
        {footer && (
          <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-t border-gray-200 flex flex-wrap justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
