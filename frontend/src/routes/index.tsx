import { lazy } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/app/config/constants";
import { StudentAreaGuard } from "@/guards/StudentAreaGuard";
import { AdminAreaGuard } from "@/guards/AdminAreaGuard";
import { StudentPortalLayout } from "@/layouts/StudentPortalLayout";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";

const LoginPage = lazy(() =>
  import("@/modules/auth/pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import("@/modules/auth/pages/RegisterPage").then((m) => ({ default: m.RegisterPage }))
);
const SetupAdminPage = lazy(() =>
  import("@/modules/auth/pages/SetupAdminPage").then((m) => ({ default: m.SetupAdminPage }))
);
const LessonListPage = lazy(() =>
  import("@/modules/lessons/pages/LessonListPage").then((m) => ({ default: m.LessonListPage }))
);
const LessonDetailPage = lazy(() =>
  import("@/modules/lessons/pages/LessonDetailPage").then((m) => ({ default: m.LessonDetailPage }))
);
const AdminLessonListPage = lazy(() =>
  import("@/modules/lessons/pages/AdminLessonListPage").then((m) => ({ default: m.AdminLessonListPage }))
);
const AdminLessonFormPage = lazy(() =>
  import("@/modules/lessons/pages/AdminLessonFormPage").then((m) => ({ default: m.AdminLessonFormPage }))
);
const FavoritesListPage = lazy(() =>
  import("@/modules/favorites/pages/FavoritesListPage").then((m) => ({ default: m.FavoritesListPage }))
);
const AdminStudentListPage = lazy(() =>
  import("@/modules/students/pages/AdminStudentListPage").then((m) => ({ default: m.AdminStudentListPage }))
);
const AdminStudentFormPage = lazy(() =>
  import("@/modules/students/pages/AdminStudentFormPage").then((m) => ({ default: m.AdminStudentFormPage }))
);
const AdminStudentDetailPage = lazy(() =>
  import("@/modules/students/pages/AdminStudentDetailPage").then((m) => ({ default: m.AdminStudentDetailPage }))
);
const AdminSchoolListPage = lazy(() =>
  import("@/modules/schools/pages/AdminSchoolListPage").then((m) => ({ default: m.AdminSchoolListPage }))
);
const AdminSchoolFormPage = lazy(() =>
  import("@/modules/schools/pages/AdminSchoolFormPage").then((m) => ({ default: m.AdminSchoolFormPage }))
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage }))
);
const StudentProfilePage = lazy(() =>
  import("@/modules/students/pages/StudentProfilePage").then((m) => ({ default: m.StudentProfilePage }))
);

function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-gray-800">403 Forbidden</h1>
      <p className="mt-2 text-gray-600 text-center">
        You do not have permission to view this page.
      </p>
      <Link
        to={ROUTES.login}
        className="mt-6 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
      >
        Go to login
      </Link>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-gray-800">404 Not Found</h1>
      <p className="mt-2 text-gray-600 text-center">
        The page you are looking for does not exist.
      </p>
      <Link
        to={ROUTES.login}
        className="mt-6 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
      >
        Go to login
      </Link>
    </div>
  );
}

type GuardComponent = React.ComponentType<{ children: React.ReactNode }>;

export const routes: Array<{
  path: string;
  element: React.ReactNode;
  guard?: GuardComponent;
}> = [
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
  { path: ROUTES.setupAdmin, element: <SetupAdminPage /> },
  { path: ROUTES.forbidden, element: <ForbiddenPage /> },
  { path: ROUTES.notFound, element: <NotFoundPage /> },
  {
    path: ROUTES.student.lessons,
    element: (
      <StudentPortalLayout>
        <LessonListPage />
      </StudentPortalLayout>
    ),
    guard: StudentAreaGuard,
  },
  {
    path: ROUTES.student.lessonDetail,
    element: (
      <StudentPortalLayout>
        <LessonDetailPage />
      </StudentPortalLayout>
    ),
    guard: StudentAreaGuard,
  },
  {
    path: ROUTES.student.favorites,
    element: (
      <StudentPortalLayout>
        <FavoritesListPage />
      </StudentPortalLayout>
    ),
    guard: StudentAreaGuard,
  },
  {
    path: ROUTES.student.profile,
    element: (
      <StudentPortalLayout>
        <StudentProfilePage />
      </StudentPortalLayout>
    ),
    guard: StudentAreaGuard,
  },
  {
    path: ROUTES.admin.dashboard,
    element: (
      <AdminDashboardLayout>
        <AdminDashboardPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.schools,
    element: (
      <AdminDashboardLayout>
        <AdminSchoolListPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.schoolNew,
    element: (
      <AdminDashboardLayout>
        <AdminSchoolFormPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.schoolEdit,
    element: (
      <AdminDashboardLayout>
        <AdminSchoolFormPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.students,
    element: (
      <AdminDashboardLayout>
        <AdminStudentListPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.studentNew,
    element: (
      <AdminDashboardLayout>
        <AdminStudentFormPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.studentDetail,
    element: (
      <AdminDashboardLayout>
        <AdminStudentDetailPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.studentEdit,
    element: (
      <AdminDashboardLayout>
        <AdminStudentFormPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.lessons,
    element: (
      <AdminDashboardLayout>
        <AdminLessonListPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.lessonNew,
    element: (
      <AdminDashboardLayout>
        <AdminLessonFormPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
  {
    path: ROUTES.admin.lessonEdit,
    element: (
      <AdminDashboardLayout>
        <AdminLessonFormPage />
      </AdminDashboardLayout>
    ),
    guard: AdminAreaGuard,
  },
];
