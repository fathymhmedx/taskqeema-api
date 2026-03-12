import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { signupSchema, type SignupFormValues } from "../schemas/signupSchema";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";
import { ROUTES } from "@/app/config/constants";

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => Promise<void>;
  error: string | null;
}

export function SignupForm({ onSubmit, error }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", schoolId: undefined },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && <Alert variant="error" message={error} />}
      <Input
        label="Full name"
        type="text"
        autoComplete="name"
        placeholder="Your full name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
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
        autoComplete="new-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="School ID"
        type="number"
        placeholder="Your school ID"
        error={errors.schoolId?.message}
        {...register("schoolId")}
      />
      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full py-2.5 font-medium"
      >
        Create account
      </Button>
      <div className="pt-4 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500 mt-3">
          Already have an account?
        </p>
        <p className="mt-2 text-center">
          <Link
            to={ROUTES.login}
            className="inline-block text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
