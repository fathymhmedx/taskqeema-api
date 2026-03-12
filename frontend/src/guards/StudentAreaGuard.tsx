import type { ReactNode } from "react";
import { AuthGuard } from "./AuthGuard";
import { StudentGuard } from "./StudentGuard";

type Props = { children: ReactNode };

export function StudentAreaGuard({ children }: Props) {
  return (
    <AuthGuard>
      <StudentGuard>{children}</StudentGuard>
    </AuthGuard>
  );
}
