import { type ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { ROUTES } from "@/app/config/constants";
import { Logo } from "@/shared/components/Logo";

type Props = { children: ReactNode };

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block font-medium py-2 rounded-md px-2 ${
    isActive
      ? "bg-primary-50 text-primary-700"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
  }`;

export function StudentPortalLayout({ children }: Props) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate(ROUTES.login);
  };
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <Logo to={ROUTES.student.lessons} onClick={closeSidebar} />
        </div>
        <nav className="p-4 flex flex-col gap-1">
          <NavLink to={ROUTES.student.lessons} className={navLinkClass} end onClick={closeSidebar}>
            Lessons
          </NavLink>
          <NavLink to={ROUTES.student.favorites} className={navLinkClass} onClick={closeSidebar}>
            Favorites
          </NavLink>
          <NavLink to={ROUTES.student.profile} className={navLinkClass} onClick={closeSidebar}>
            My Profile
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto p-4 text-left text-gray-600 hover:text-gray-900 font-medium"
        >
          Logout
        </button>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden
        />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={2} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Student Portal</h1>
        </header>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
