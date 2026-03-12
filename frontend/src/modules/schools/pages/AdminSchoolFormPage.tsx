import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SchoolForm } from "../components/SchoolForm";
import { useSchoolById } from "../hooks/useSchoolById";
import * as schoolsService from "../services/schoolsService";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Card } from "@/shared/components/Card";
import { Alert } from "@/shared/components/Alert";
import { LoadingState } from "@/shared/components/LoadingState";
import { ROUTES } from "@/app/config/constants";

export function AdminSchoolFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id != null;
  const schoolId = isEdit ? parseInt(id, 10) : null;
  const { school, loading } = useSchoolById(Number.isNaN(schoolId ?? NaN) ? null : schoolId);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && schoolId != null && !loading && !school) {
      navigate(ROUTES.admin.schools, { replace: true });
    }
  }, [isEdit, schoolId, loading, school, navigate]);

  const handleSubmit = async (values: {
    name?: string;
    phone?: string;
    logo?: string | null;
  }) => {
    setSubmitError(null);
    try {
      if (isEdit && schoolId != null) {
        await schoolsService.updateSchool(schoolId, values);
      } else {
        await schoolsService.createSchool({
          name: values.name!,
          phone: values.phone!,
          logo: values.logo || undefined,
        });
      }
      navigate(ROUTES.admin.schools);
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Failed to save school"));
    }
  };

  if (isEdit && loading) return <LoadingState />;
  if (isEdit && school == null) return null;

  const defaultValues =
    isEdit && school
      ? {
          name: school.name,
          phone: school.phone,
          logo: school.logo ?? "",
        }
      : undefined;

  return (
    <div className="container-content max-w-3xl mx-auto py-4 sm:py-6">
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {isEdit ? "Edit school" : "New school"}
        </h1>
        {submitError && <Alert variant="error" message={submitError} />}
        <Card className="p-4 sm:p-6">
          <SchoolForm defaultValues={defaultValues} onSubmit={handleSubmit} isEdit={isEdit} />
        </Card>
      </div>
    </div>
  );
}
