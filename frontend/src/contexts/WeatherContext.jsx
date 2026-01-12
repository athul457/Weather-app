import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentWeather,
  getForecastWeather,
} from "../services/WeatherServices";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Delhi");
  const [unit, setUnit] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("weather_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weather_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const current = await getCurrentWeather(city, unit);
        const forecastRes = await getForecastWeather(city, unit);

        const dailyForecast =
          forecastRes?.list
            ?.filter((_, i) => i % 8 === 0)
            .map((item) => ({
              date: new Date(item.dt_txt).toDateString(),
              condition: item.weather[0].main,
              temp: item.main.temp,
              humidity: item.main.humidity,
              wind: item.wind.speed,
            })) || [];

        // Mock additional 10 days for 15-day forecast
        const lastDate = new Date(dailyForecast[dailyForecast.length - 1].date);
        for (let i = 1; i <= 10; i++) {
          const nextDate = new Date(lastDate);
          nextDate.setDate(lastDate.getDate() + i);

          dailyForecast.push({
            date: nextDate.toDateString(),
            condition: ["Sunny", "Cloudy", "Rain", "Clear"][
              Math.floor(Math.random() * 4)
            ],
            temp: Math.round(Math.random() * (35 - 15) + 15), // Random temp 15-35
            humidity: Math.round(Math.random() * (90 - 40) + 40),
            wind: Math.round(Math.random() * (20 - 5) + 5),
          });
        }

        setCurrentWeather(current);
        setForecast(dailyForecast);

        console.log("Forecast API response:", forecastRes);
      } catch (err) {
        setError("Unable to fetch weather data");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  const toggleFavorite = (cityName) => {
    setFavorites((prev) => {
      if (prev.includes(cityName)) {
        return prev.filter((c) => c !== cityName);
      } else {
        return [...prev, cityName];
      }
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        unit,
        setUnit,
        currentWeather,
        forecast,
        loading,
        error,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
