import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLessonSchema, type CreateLessonFormValues } from "../schemas/createLessonSchema";
import { updateLessonSchema, type UpdateLessonFormValues } from "../schemas/updateLessonSchema";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

interface LessonFormProps {
  defaultValues?: Partial<CreateLessonFormValues> & Partial<UpdateLessonFormValues>;
  onSubmit: (values: CreateLessonFormValues | UpdateLessonFormValues) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export function LessonForm({ defaultValues, onSubmit, loading, isEdit }: LessonFormProps) {
  const schema = isEdit ? updateLessonSchema : createLessonSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLessonFormValues | UpdateLessonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      content: "",
      image: "",
      sortOrder: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-0">
      <Input
        label="Title"
        error={errors.title?.message}
        {...register("title")}
      />
      <div className="w-full">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <Input
        label="Image URL"
        type="url"
        error={errors.image?.message}
        {...register("image")}
      />
      <Input
        label="Sort order"
        type="number"
        error={errors.sortOrder?.message}
        {...register("sortOrder", { valueAsNumber: true })}
      />
      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="submit" loading={isSubmitting || loading} className="min-w-[7rem]">
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
