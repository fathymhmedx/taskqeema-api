import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { SignupForm } from "../components/SignupForm";
import { Logo } from "@/shared/components/Logo";
import { ROUTES } from "@/app/config/constants";

export function RegisterPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    fullName: string;
    schoolId: number;
  }) => {
    setError(null);
    try {
      await signup(values);
      navigate(ROUTES.student.lessons, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-primary-50/30 p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo className="text-primary-600" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Create account
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign up to access your lessons
            </p>
          </div>
          <SignupForm onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </div>
  );
}
