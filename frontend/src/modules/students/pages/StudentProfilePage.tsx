import { useCurrentStudentProfile } from "../hooks/useCurrentStudentProfile";
import { LoadingState } from "@/shared/components/LoadingState";
import { Alert } from "@/shared/components/Alert";

export function StudentProfilePage() {
  const { profile, loading, error } = useCurrentStudentProfile();

  if (loading) return <LoadingState />;

  return (
    <div className="max-w-2xl space-y-4 min-w-0">
      <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
      {error && <Alert variant="error" message={error} />}
      {profile && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</p>
              <p className="mt-1 text-gray-900 font-medium">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
              <p className="mt-1 text-gray-900 break-all">{profile.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Grade</p>
              <p className="mt-1 text-gray-900">{profile.grade ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">School</p>
              <p className="mt-1 text-gray-900">{profile.schoolName ?? "—"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
