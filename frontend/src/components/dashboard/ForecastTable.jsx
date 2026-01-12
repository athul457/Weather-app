import React from "react";
import { useWeather } from "../../contexts/WeatherContext";

const ForecastTable = ({ limit, paginated }) => {
  const { forecast, loading, city, unit } = useWeather();
  const [showAll, setShowAll] = React.useState(false);

  // If paginated, show 7 initially, else show limit or all
  const displayCount = paginated ? (showAll ? 15 : 7) : limit || forecast.length;
  const displayedForecast = forecast.slice(0, displayCount);

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "km/h" : "mph";

  if (loading) {
    return (
      <div className="rounded-xl bg-white/80 backdrop-blur-md p-6 shadow-lg border border-white/40">
        <p className="text-gray-600">Loading forecast...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gray-300/100 backdrop-blur-md p-6 shadow-lg border border-white/40">
      <h3 className="mb-4 text-lg font-semibold text-yellow-600">
        {paginated ? "15-Day Forecast" : "5-Day Forecast"} - {city}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Condition</th>
              <th className="px-4 py-3 font-medium">Temp</th>
              <th className="px-4 py-3 font-medium">Humidity</th>
              <th className="px-4 py-3 font-medium">Wind</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {displayedForecast.map((day, index) => (
              <tr key={index} className="transition hover:bg-yellow-400 text-gray-700">
                <td className="px-4 py-3 font-medium text-gray-900">{day.date}</td>
                <td className="px-4 py-3">{day.condition}</td>
                <td className="px-4 py-3">{day.temp}{tempUnit}</td>
                <td className="px-4 py-3">{day.humidity}%</td>
                <td className="px-4 py-3">{day.wind} {windUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginated && forecast.length > 7 && (
        <div className="mt-4 flex justify-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="rounded-lg bg-yellow-400 px-6 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition shadow-md"
            >
              More
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="rounded-lg bg-yellow-400 border border-gray-300 px-6 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition shadow-sm"
            >
              Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ForecastTable;
