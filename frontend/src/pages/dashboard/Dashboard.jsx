import { useState } from "react";
import { useWeather } from "../../contexts/WeatherContext";
import ForecastTable from "../../components/dashboard/ForecastTable";
import KpiCard from "../../components/dashboard/KpiCard";
import MapWidget from "../../components/dashboard/MapWidget";
import WeatherInsightCard from "../../components/dashboard/WeatherInsightCard";
import UnitToggle from "../../components/dashboard/UnitToggle";
import WeatherChart from "../../components/dashboard/WeatherChart";
import { motion } from "framer-motion";

import "leaflet/dist/leaflet.css";

function Dashboard() {
  const { city, setCity, favorites, toggleFavorite } = useWeather();
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
      setSearchCity("");
    }
  };

  const isFavorite = favorites.includes(city);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between ">
        <h1 className="text-2xl font-bold text-black flex items-center gap-3 mt-13">
          Weather Dashboard
           <button
             onClick={() => toggleFavorite(city)}
             className={`text-2xl transition hover:scale-110 ${
               isFavorite ? "text-yellow-400" : "text-gray-400 hover:text-yellow-200"
             }`}
             title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
           >
             {isFavorite ? "⭐" : "☆"}
           </button>
        </h1>

        <div className="flex items-center gap-4 mt-13">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-black"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition font-medium"
            >
              Search
            </button>
          </form>
          <UnitToggle />
        </div>
      </motion.div>

      {/* AI Insight Card - Prominent Placement */}
      <motion.section variants={item}>
         <WeatherInsightCard />
      </motion.section>

      {/* KPI Cards */}
      <motion.section variants={item}>
        <KpiCard />
      </motion.section>

      {/* Chart + Map */}
      <motion.section variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeatherChart />
        <MapWidget />
      </motion.section>

      {/* Forecast Table */}
      <motion.section variants={item}>
        <ForecastTable limit={5} paginated={false} />
      </motion.section>
    </motion.div>
  );
}

export default Dashboard;
