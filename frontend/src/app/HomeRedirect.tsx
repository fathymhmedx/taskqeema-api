import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { LoadingState } from "@/shared/components/LoadingState";
import { ROUTES } from "@/app/config/constants";

export function HomeRedirect() {
  const { user, isReady } = useAuth();

  if (!isReady) return <LoadingState />;

  if (user?.role === "ADMIN") {
    return <Navigate to={ROUTES.admin.dashboard} replace />;
  }
  if (user?.role === "STUDENT") {
    return <Navigate to={ROUTES.student.lessons} replace />;
  }
  return <Navigate to={ROUTES.login} replace />;
}
