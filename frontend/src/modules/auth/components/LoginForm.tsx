import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";
import { ROUTES } from "@/app/config/constants";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  error: string | null;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && <Alert variant="error" message={error} />}
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full py-2.5 font-medium"
      >
        Sign in
      </Button>
      <div className="pt-4 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500 mt-3">
          Don&apos;t have an account?
        </p>
        <p className="mt-2 text-center">
          <Link
            to={ROUTES.register}
            className="inline-block text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}
