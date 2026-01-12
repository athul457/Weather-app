import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import { useWeather } from "../../contexts/WeatherContext";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Map() {
  const { currentWeather, loading } = useWeather();
  const [activeLayer, setActiveLayer] = useState("precipitation_new");

  if (loading || !currentWeather) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-black">Weather Map</h1>
        <div className="flex h-[500px] items-center justify-center rounded-xl bg-white">
          Loading map...
        </div>
      </div>
    );
  }

  const { lat, lon } = currentWeather.coord;
  const city = currentWeather.name;
  const temp = currentWeather.main.temp;
  const condition = currentWeather.weather[0].main;

  const layers = [
    { id: "precipitation_new", label: "Precipitation ☔" },
    { id: "clouds_new", label: "Clouds ☁️" },
    { id: "wind_new", label: "Wind 🌬️" },
    { id: "temp_new", label: "Temperature 🌡️" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-14">
        <div>
          <h1 className="text-2xl font-bold text-black">Weather Map</h1>
          <span className="text-sm text-blue-800">
            Live weather visualization
          </span>
        </div>

        {/* Layer Controls */}
        <div className="flex gap-2 bg-white/10 rounded-lg p-1">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                activeLayer === layer.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-yellow-600 hover:bg-white"
              }`}
            >
              {activeLayer === layer.id && "✓ "}
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Card */}
      <div className="rounded-xl  backdrop-blur-md p-6 shadow-lg border border-white/20">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          className="h-[500px] w-full rounded-lg shadow-inner z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <TileLayer
            key={activeLayer}
            url={`https://tile.openweathermap.org/map/${activeLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />

          <Marker position={[lat, lon]}>
            <Popup>
              <strong>{city}</strong> <br />
              🌡 Temp: {temp}° <br />
              🌤 {condition}
            </Popup>
          </Marker>
        </MapContainer>

        {/* Map Info */}
        <div className="mt-4 flex justify-between text-sm text-gray-300">
          <span className="flex items-center gap-2">
            📍 <span className="font-semibold text-black">{city}</span>
          </span>
          <span className="flex items-center gap-2">
             Lat: <span className="font-mono text-black">{lat}</span> | Lon: <span className="font-mono text-black">{lon}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Map;
