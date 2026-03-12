import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentSchema, type CreateStudentFormValues } from "../schemas/createStudentSchema";
import { updateStudentSchema, type UpdateStudentFormValues } from "../schemas/updateStudentSchema";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { useSchoolsForSelect } from "@/modules/schools/hooks/useSchoolsForSelect";

type FormValues = CreateStudentFormValues | UpdateStudentFormValues;

interface StudentFormProps {
  defaultValues?: Partial<UpdateStudentFormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export function StudentForm({ defaultValues, onSubmit, loading, isEdit }: StudentFormProps) {
  const { schools, loading: schoolsLoading } = useSchoolsForSelect();
  const schema = isEdit ? updateStudentSchema : createStudentSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      name: "",
      email: "",
      password: "",
      grade: "",
      schoolId: undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-0 max-w-full">
      <Input label="Name" error={errors.name?.message} {...register("name")} />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      {!isEdit && (
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
      )}
      {isEdit && (
        <Input
          label="New password (leave blank to keep)"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
      )}
      <Input label="Grade" error={errors.grade?.message} {...register("grade")} />
      <div className="w-full">
        <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700 mb-1">
          School
        </label>
        <select
          id="schoolId"
          disabled={schoolsLoading}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          {...register("schoolId", { valueAsNumber: true })}
        >
          <option value="">Select school</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.schoolId && (
          <p className="mt-1 text-sm text-red-600">{errors.schoolId.message}</p>
        )}
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={isSubmitting || loading}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
