import { Link } from "react-router-dom";
import { useStudentsList } from "@/modules/students/hooks/useStudentsList";
import { useSchoolsList } from "@/modules/schools/hooks/useSchoolsList";
import { useLessonsList } from "@/modules/lessons/hooks/useLessonsList";
import { useAdminStats } from "@/hooks/useAdminStats";
import { ROUTES } from "@/app/config/constants";

const statCardClass =
  "group block bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-primary-100 hover:-translate-y-0.5 transition-all duration-200";

const LIMIT = 5;

export function AdminDashboardPage() {
  const { students, total: studentsTotal, loading: studentsLoading } = useStudentsList(1, LIMIT, "");
  const { schools, loading: schoolsLoading } = useSchoolsList();
  const { lessons, total: lessonsTotal, loading: lessonsLoading } = useLessonsList(1, LIMIT);
  const { stats: adminStats, loading: adminStatsLoading } = useAdminStats();

  const statsLoading = studentsLoading || schoolsLoading || lessonsLoading || adminStatsLoading;
  const recentSchools = schools.slice(0, LIMIT);
  const recentStudents = students;
  const recentLessons = lessons;

  return (
    <div className="container-content max-w-5xl space-y-10 min-w-0">
      <div className="pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Welcome to the dashboard
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Manage schools, students, and lessons in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link to={ROUTES.admin.students} className={statCardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Students</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums mt-0.5">
            {statsLoading ? "—" : studentsTotal}
          </p>
        </Link>

        <Link to={ROUTES.admin.schools} className={statCardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Schools</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums mt-0.5">
            {statsLoading ? "—" : schools.length}
          </p>
        </Link>

        <Link to={ROUTES.admin.lessons} className={statCardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Lessons</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums mt-0.5">
            {statsLoading ? "—" : lessonsTotal}
          </p>
        </Link>

        <div className={statCardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Total favorite lessons</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums mt-0.5">
            {statsLoading ? "—" : (adminStats?.favoritesCount ?? 0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">Last 5 students</h2>
            <Link to={ROUTES.admin.students} className="text-xs text-primary-600 hover:underline font-medium">
              All
            </Link>
          </div>
          <ul className="space-y-2">
            {studentsLoading ? (
              <li className="text-sm text-gray-400">Loading...</li>
            ) : recentStudents.length === 0 ? (
              <li className="text-sm text-gray-400">No students</li>
            ) : (
              recentStudents.map((s) => (
                <li key={s.id}>
                  <Link
                    to={ROUTES.admin.studentDetail.replace(":id", String(s.id))}
                    className="text-sm text-gray-700 hover:text-primary-600 hover:underline block truncate"
                  >
                    {s.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">Last 5 schools</h2>
            <Link to={ROUTES.admin.schools} className="text-xs text-primary-600 hover:underline font-medium">
              All
            </Link>
          </div>
          <ul className="space-y-2">
            {schoolsLoading ? (
              <li className="text-sm text-gray-400">Loading...</li>
            ) : recentSchools.length === 0 ? (
              <li className="text-sm text-gray-400">No schools</li>
            ) : (
              recentSchools.map((school) => (
                <li key={school.id}>
                  <Link
                    to={ROUTES.admin.schoolEdit.replace(":id", String(school.id))}
                    className="text-sm text-gray-700 hover:text-primary-600 hover:underline block truncate"
                  >
                    {school.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">Last 5 lessons</h2>
            <Link to={ROUTES.admin.lessons} className="text-xs text-primary-600 hover:underline font-medium">
              All
            </Link>
          </div>
          <ul className="space-y-2">
            {lessonsLoading ? (
              <li className="text-sm text-gray-400">Loading...</li>
            ) : recentLessons.length === 0 ? (
              <li className="text-sm text-gray-400">No lessons</li>
            ) : (
              recentLessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={ROUTES.admin.lessonEdit.replace(":id", String(lesson.id))}
                    className="text-sm text-gray-700 hover:text-primary-600 hover:underline block truncate"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
