import { useWeather } from "../../contexts/WeatherContext";

function KpiCard() {
  const { currentWeather, unit, loading } = useWeather();

  if (loading || !currentWeather) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl bg-white p-5 shadow"
          />
        ))}
      </div>
    );
  }

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windSpeed =
    unit === "metric"
      ? `${(currentWeather.wind.speed * 3.6).toFixed(1)} km/h`
      : `${currentWeather.wind.speed.toFixed(1)} mph`;

  const kpis = [
    {
      label: "Temperature",
      value: `${currentWeather.main.temp}${tempUnit}`,
      sub: `Feels like ${currentWeather.main.feels_like}${tempUnit}`,
      color: "text-orange-500",
      bg: "bg-orange-100",
      icon: "🌡️",
    },
    {
      label: "Humidity",
      value: `${currentWeather.main.humidity}%`,
      sub: "Relative humidity",
      color: "text-blue-500",
      bg: "bg-blue-100",
      icon: "💧",
    },
    {
      label: "Wind Speed",
      value: windSpeed,
      sub: `Direction: ${currentWeather.wind.deg}°`,
      color: "text-green-500",
      bg: "bg-green-100",
      icon: "🌬️",
    },
    {
      label: "Pressure",
      value: `${currentWeather.main.pressure} hPa`,
      sub: "Atmospheric pressure",
      color: "text-purple-500",
      bg: "bg-purple-100",
      icon: "☁️",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="rounded-xl bg-gray-300/100 backdrop-blur-md p-5 shadow-lg border border-white/40 transition hover:bg-white hover:scale-105 duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">{kpi.label}</p>
              <h3 className="mt-1 text-2xl font-bold text-yellow-600">
                {kpi.value}
              </h3>
              <p className="mt-1 text-xs text-blue-600">{kpi.sub}</p>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl shadow-sm`}
            >
              {kpi.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KpiCard;
