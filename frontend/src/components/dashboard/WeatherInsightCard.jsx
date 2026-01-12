import { useWeather } from "../../contexts/WeatherContext";
import { motion } from "framer-motion";

function WeatherInsightCard() {
  const { currentWeather, unit, loading } = useWeather();

  if (loading || !currentWeather) return null;

  const getInsight = () => {
    const { weather, main, wind } = currentWeather;
    const condition = weather[0].main.toLowerCase();
    const temp = main.temp; // Unit dependent
    const windSpeed = wind.speed; // Unit dependent

    // Base condition checks
    if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunderstorm")) {
      return {
        icon: "☔",
        title: "Rainy Day Ahead",
        message: "Don't forget your umbrella! Roads might be slippery, so drive carefully.",
        color: "bg-blue-100 border-blue-200 text-blue-800",
      };
    }

    if (condition.includes("snow")) {
      return {
        icon: "❄️",
        title: "Snowfall Expected",
        message: "Bundle up! It's freezing outside. Watch out for icy patches.",
        color: "bg-cyan-100 border-cyan-200 text-cyan-800",
      };
    }

    // Temperature checks (approximate conversion for logic)
    const isHot = (unit === "metric" && temp > 30) || (unit === "imperial" && temp > 86);
    const isCold = (unit === "metric" && temp < 10) || (unit === "imperial" && temp < 50);

    if (isHot) {
      return {
        icon: "☀️",
        title: "High Heat Advisory",
        message: "It's scorching today! Stay hydrated, wear sunscreen, and avoid direct sun at noon.",
        color: "bg-orange-100 border-orange-200 text-orange-800",
      };
    }

    if (isCold) {
      return {
        icon: "🧣",
        title: "Chilly Weather",
        message: "It's quite cold. A warm coat and maybe a hot coffee would be perfect!",
        color: "bg-indigo-100 border-indigo-200 text-indigo-800",
      };
    }

    if (condition.includes("clear")) {
      return {
        icon: "😎",
        title: "Clear Skies",
        message: "Perfect weather for a walk! Don't forget your sunglasses.",
        color: "bg-yellow-100 border-yellow-200 text-yellow-800",
      };
    }

    if (condition.includes("cloud")) {
      return {
        icon: "☁️",
        title: "Cloudy Skies",
        message: "Good weather for outdoor activities, but keep an eye on the forecast.",
        color: "bg-gray-100 border-gray-200 text-gray-800",
      };
    }

    return {
      icon: "🤖",
      title: "Weather Report",
      message: "Enjoy your day! Check back for updates if the weather changes.",
      color: "bg-purple-100 border-purple-200 text-purple-800",
    };
  };

  const insight = getInsight();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-xl p-6 shadow-lg border backdrop-blur-md ${insight.color} flex items-start gap-4`}
    >
      <div className="text-4xl">{insight.icon}</div>
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">
           {insight.title}
           <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 text-gray-900 font-normal uppercase tracking-wider border border-white/20">
             AI Insight
           </span>
        </h3>
        <p className="text-sm opacity-90 leading-relaxed font-medium">
          {insight.message}
        </p>
      </div>
    </motion.div>
  );
}

export default WeatherInsightCard;
