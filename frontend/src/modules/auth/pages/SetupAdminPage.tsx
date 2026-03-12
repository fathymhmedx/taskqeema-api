import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { SetupAdminForm } from "../components/SetupAdminForm";
import { Card } from "@/shared/components/Card";
import { ROUTES } from "@/app/config/constants";

export function SetupAdminPage() {
  const { setupAdmin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    secret: string;
  }) => {
    setError(null);
    try {
      await setupAdmin(values);
      navigate(ROUTES.admin.dashboard, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Setup failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card title="Setup admin" className="w-full max-w-md">
        <SetupAdminForm onSubmit={handleSubmit} error={error} />
      </Card>
    </div>
  );
}
