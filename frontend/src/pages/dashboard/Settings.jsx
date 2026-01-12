import { motion } from "framer-motion";
import { useWeather } from "../../contexts/WeatherContext";
import { useState, useEffect } from "react";

function Settings() {
  const { city, setCity, unit, setUnit } = useWeather();
  const [localCity, setLocalCity] = useState(city);
  const [localUnit, setLocalUnit] = useState(unit);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLocalCity(city);
    setLocalUnit(unit);
  }, [city, unit]);

  const handleSave = () => {
    setCity(localCity);
    setUnit(localUnit);
    setMessage("Settings updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 ml-55 mt-20"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Settings</h1>
        <p className="mt-1 text-sm text-blue-800">
          Manage your application preferences
        </p>
      </div>

      {/* Settings Card */}
      <div className="max-w-2xl rounded-xl bg-gray-300/100 backdrop-blur-md p-6 shadow-lg border border-white/20 space-y-6 text-red-500">
        
        {message && (
           <div className="p-3 bg-green-500/20 text-green-200 border border-green-500/50 rounded-lg text-sm">
             {message}
           </div>
        )}

        {/* Temperature Unit */}
        <div>
          <label className="block text-sm font-medium text-blue-800">
            Temperature Unit
          </label>
          <select
            value={localUnit}
            onChange={(e) => setLocalUnit(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/20 bg-white/50 px-4 py-2 text-black focus:border-blue-500 focus:outline-none"
          >
            <option className="text-gray-900 bg-yellow-400" value="metric">Celsius (°C)</option>
            <option className="text-gray-900 bg-yellow-400" value="imperial">Fahrenheit (°F)</option>
          </select>
        </div>

        {/* Default Location */}
        <div>
          <label className="block text-sm font-medium text-blue-800">
            Default Location
          </label>
          <input
            type="text"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            placeholder="Enter city name"
            className="mt-2 w-full rounded-lg border border-white/20 bg-white/50 px-4 py-2 text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Theme Info */}
        <div className="text-sm text-black">
          Dark theme is enabled by default for better visibility.
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="rounded-lg bg-yellow-400 px-6 py-2 font-semibold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;
