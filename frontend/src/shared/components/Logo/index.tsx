import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/utils/cn";

interface LogoProps {
  to?: string;
  brandName?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}

export function Logo({ to, brandName = "TaskQeema", className, onClick }: LogoProps) {
  const content = (
    <>
      <svg
        className="h-8 w-8 shrink-0 text-primary-600"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M8 6v20l8-4 8 4V6L16 2 8 6z"
          fill="currentColor"
          fillOpacity="0.9"
        />
        <path
          d="M16 10l6 3v8l-6-3-6 3v-8l6-3z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
      <span className="font-semibold text-gray-900 truncate">{brandName}</span>
    </>
  );

  const baseClass = cn(
    "inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md",
    className
  );

  if (to) {
    return (
      <Link to={to} className={baseClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <span className={baseClass} onClick={onClick} role={onClick ? "button" : undefined}>
      {content}
    </span>
  );
}
