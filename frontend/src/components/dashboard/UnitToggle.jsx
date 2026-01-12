import { useWeather } from "../../contexts/WeatherContext";

function UnitToggle() {
  const { unit, setUnit } = useWeather();

  return (
    <div className="flex items-center justify-end ">
      <div className="flex rounded-lg bg-gray-200 p-1">
        <button
          onClick={() => setUnit("metric")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition
            ${
              unit === "metric"
                ? "bg-blue-300 shadow text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          °C
        </button>

        <button
          onClick={() => setUnit("imperial")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition
            ${
              unit === "imperial"
                ? "bg-white shadow text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default UnitToggle;
