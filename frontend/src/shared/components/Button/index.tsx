import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 border-transparent",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 border-gray-300",
};

export function Button({
  className,
  variant = "primary",
  loading,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        className
      )}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
