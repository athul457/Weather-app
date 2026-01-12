import { NavLink } from "react-router-dom";
import { useWeather } from "../../contexts/WeatherContext";

function Sidebar() {
  const { favorites, setCity } = useWeather();

  const linkClasses = ({ isActive }) =>
    `relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "bg-white/40 text-red-700 shadow-lg backdrop-blur-sm border border-white/10"
         : "text-yellow-600 hover:bg-yellow-400 hover:text-white"
     }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-200/80 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col overflow-y-auto z-50  shadow-gray-800/80 shadow-lg
">
      {/* Logo */}
      <div className="mb-10 px-2">
         <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-black">
           WeatherApp
         </h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" end className={linkClasses}>
          <span>📊</span> Dashboard
        </NavLink>

        <NavLink to="/dashboard/map" className={linkClasses}>
          <span>🗺️</span> Live Map
        </NavLink>

        <NavLink to="/dashboard/forecast" className={linkClasses}>
          <span>📅</span> Forecast
        </NavLink>

        <NavLink to="/dashboard/settings" className={linkClasses}>
          <span>⚙️</span> Settings
        </NavLink>
        
        <NavLink to="/dashboard/profile" className={linkClasses}>
          <span>👤</span> Profile
        </NavLink>
      </nav>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 px-2 text-xs font-semibold text-black uppercase tracking-wider">
            Saved Locations
          </h3>
          <div className="space-y-1">
            {favorites.map((city) => (
              <button
                key={city}
                onClick={() => setCity(city)}
                className="w-full text-left rounded-lg px-4 py-2 text-sm text-blue-600 hover:bg-white/60 transition group flex items-center justify-between"
              >
                <span>{city}</span>
                <span className="opacity-0 group-hover:opacity-100 text-yellow-500 text-xs shadow-glow">⭐</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
