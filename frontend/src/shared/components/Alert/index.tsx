import { cn } from "@/shared/utils/cn";

type Variant = "error" | "success" | "info";

interface AlertProps {
  variant?: Variant;
  message: string;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-800",
  info: "bg-primary-50 border-primary-200 text-primary-800",
};

export function Alert({ variant = "error", message, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "p-3 text-sm border rounded-md",
        variantClasses[variant],
        className
      )}
    >
      {message}
    </div>
  );
}
