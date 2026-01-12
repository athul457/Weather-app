import { Link } from "react-router-dom";

function DashboardNavbar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 z-40 flex items-center justify-end px-8">
       {/* Glass container for navbar items */}
      <nav className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-3 shadow-lg flex items-center gap-6">
        <ul className="flex items-center gap-6 list-none m-0">
          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition"
            >
              <span>👤</span>
              <span>Profile</span>
            </Link>
          </li>

          <div className="h-4 w-px bg-gray-300"></div>

          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition"
            >
              <span>🚪</span>
              <span>Back to Home</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default DashboardNavbar;
