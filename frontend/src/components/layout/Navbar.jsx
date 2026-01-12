import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex w-full items-center justify-between bg-white/30 p-4 shadow-lg backdrop-blur-md dark:bg-gray-900/30 dark:shadow-gray-900"
    >
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition dark:from-blue-400 dark:to-purple-400"
        >
          Weather App
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-6 list-none m-0 p-0 text-gray-800 dark:text-gray-200 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="rounded-full bg-blue-600 px-5 py-2 text-white shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Theme Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xl transition hover:bg-gray-300 dark:bg-gray-700 dark:text-yellow-400 dark:hover:bg-gray-600"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button> */}
      </div>
    </motion.nav>
  );
}

export default Navbar;
