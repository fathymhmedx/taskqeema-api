import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/app/config/constants";

type Props = { children: ReactNode };

export function AuthGuard({ children }: Props) {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (!token) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
