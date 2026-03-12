import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSchoolSchema, type CreateSchoolFormValues } from "../schemas/createSchoolSchema";
import { updateSchoolSchema, type UpdateSchoolFormValues } from "../schemas/updateSchoolSchema";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

type FormValues = CreateSchoolFormValues | UpdateSchoolFormValues;

interface SchoolFormProps {
  defaultValues?: Partial<UpdateSchoolFormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export function SchoolForm({ defaultValues, onSubmit, loading, isEdit }: SchoolFormProps) {
  const schema = isEdit ? updateSchoolSchema : createSchoolSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      name: "",
      phone: "",
      logo: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-0 max-w-full">
      <Input label="Name" error={errors.name?.message} {...register("name")} />
      <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone")} />
      <Input label="Logo URL" type="url" error={errors.logo?.message} {...register("logo")} />
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={isSubmitting || loading}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
