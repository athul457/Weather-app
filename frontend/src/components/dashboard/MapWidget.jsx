import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useWeather } from "../../contexts/WeatherContext";

function MapWidget() {
  const { currentWeather } = useWeather();

  if (!currentWeather) {
    return <div className="rounded-xl bg-white p-6 shadow">Loading map...</div>;
  }

  const { lat, lon } = currentWeather.coord;
  const city = currentWeather.name;

  return (
    <div className="rounded-xl bg-gray-300/100 backdrop-blur-md p-6 shadow-lg border border-white/40">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-yellow-600">Weather Map</h3>
        <span className="text-sm text-blue-600 font-medium">Live Location</span>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        className="h-64 w-full rounded-lg shadow-inner z-0 border border-gray-200"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lon]}>
          <Popup>
            📍 {city} <br />
            Temp: {currentWeather.main.temp}°
          </Popup>
        </Marker>
      </MapContainer>

      {/* Location Info */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>📍 {city}</span>
        <span>
          Lat: {lat} | Lon: {lon}
        </span>
      </div>
    </div>
  );
}

export default MapWidget;
