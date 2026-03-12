import { type ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/config/constants";
import { Logo } from "@/shared/components/Logo";

type Props = { children: ReactNode };

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block font-medium py-2 rounded-md px-2 ${
    isActive
      ? "bg-primary-50 text-primary-700"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
  }`;

export function AdminDashboardLayout({ children }: Props) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate(ROUTES.login);
  };
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <div className="min-h-screen bg-gray-100 flex overflow-x-hidden">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[min(14rem,85vw)] sm:w-56 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <Logo to={ROUTES.admin.dashboard} onClick={closeSidebar} className="min-w-0" />
        </div>
        <nav className="p-3 sm:p-4 flex flex-col gap-1">
          <NavLink to={ROUTES.admin.dashboard} className={navLinkClass} end onClick={closeSidebar}>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.admin.schools} className={navLinkClass} onClick={closeSidebar}>
            Schools
          </NavLink>
          <NavLink to={ROUTES.admin.students} className={navLinkClass} onClick={closeSidebar}>
            Students
          </NavLink>
          <NavLink to={ROUTES.admin.lessons} className={navLinkClass} onClick={closeSidebar}>
            Lessons
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto p-3 sm:p-4 text-left text-gray-600 hover:text-gray-900 font-medium"
        >
          Logout
        </button>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2 min-h-[3rem] shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="md:hidden p-2 -ml-1 text-gray-600 hover:bg-gray-100 rounded-md"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-4 sm:p-5 md:p-6 overflow-x-hidden overflow-y-auto min-w-0">{children}</main>
      </div>
    </div>
  );
}
