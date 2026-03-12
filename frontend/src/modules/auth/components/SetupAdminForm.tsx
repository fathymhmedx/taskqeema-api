import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setupAdminSchema, type SetupAdminFormValues } from "../schemas/setupAdminSchema";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";

interface SetupAdminFormProps {
  onSubmit: (values: SetupAdminFormValues) => Promise<void>;
  error: string | null;
}

export function SetupAdminForm({ onSubmit, error }: SetupAdminFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetupAdminFormValues>({
    resolver: zodResolver(setupAdminSchema),
    defaultValues: { email: "", password: "", secret: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert variant="error" message={error} />}
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Admin secret"
        type="password"
        error={errors.secret?.message}
        {...register("secret")}
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">
          Setup admin
        </Button>
      </div>
    </form>
  );
}
