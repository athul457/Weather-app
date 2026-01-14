import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWeather } from "../../contexts/WeatherContext";

function WeatherChart() {
  const { forecast, unit, loading } = useWeather();

  if (loading || !forecast.length) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Temperature Trend
        </h3>
        <div className="flex h-64 items-center justify-center text-gray-400">
          Loading chart...
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = forecast.map((day) => ({
    day: new Date(day.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    temp: Math.round(day.temp),
  }));

  const unitLabel = unit === "metric" ? "°C" : "°F";

  return (
    <div className="rounded-xl bg-gray-300/100 backdrop-blur-md p-6 shadow-lg border border-white/40">
      <h3 className="mb-4 text-lg font-semibold text-yellow-600">
        Temperature Trend ({unitLabel})
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: "#4b5563" }} />
            <YAxis stroke="#9ca3af" tick={{ fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                color: "#1f2937",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`${value}${unitLabel}`, "Temp"]}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563eb" }}
              activeDot={{ r: 6, fill: "#1d4ed8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeatherChart;
