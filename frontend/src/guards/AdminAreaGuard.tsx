import type { ReactNode } from "react";
import { AuthGuard } from "./AuthGuard";
import { AdminGuard } from "./AdminGuard";

type Props = { children: ReactNode };

export function AdminAreaGuard({ children }: Props) {
  return (
    <AuthGuard>
      <AdminGuard>{children}</AdminGuard>
    </AuthGuard>
  );
}
