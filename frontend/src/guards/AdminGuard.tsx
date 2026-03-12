import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/app/config/constants";

type Props = { children: ReactNode };

export function AdminGuard({ children }: Props) {
  try {
    const raw = localStorage.getItem("user");
    const user = raw ? (JSON.parse(raw) as { role?: string }) : null;
    if (user?.role !== "ADMIN") {
      return <Navigate to={ROUTES.forbidden} replace />;
    }
  } catch {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <>{children}</>;
}
