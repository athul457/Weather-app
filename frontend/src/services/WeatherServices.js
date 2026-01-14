// import axios from "axios";

// const API_kEY = import.meta.env.VITE_WEATHER_API_KEY;
// const BASE_URL = "https://api.openweathermap.org/data/2.5";

// const weatherApi = axios.create({
//   timeout: 1000000,
// });

// export const getCurrentWeather = async (city, unit) => {
//   try {
//     const response = await weatherApi.get("/weather", {
//       params: {
//         q: city,
//         appid: API_kEY,
//         units: unit,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.log("weather error", err.message);
//     throw err;
//   }
// };

// export const getForecastWeather = async (city, unit) => {
//   try {
//     const response = await weatherApi.get("/forecast", {
//       params: {
//         q: city,
//         appid: API_kEY,
//         units: unit,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log("weather forecast error", error.message);
//     throw error;
//   }
// };

import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

export const getCurrentWeather = async (city, unit) => {
  try {
    const response = await weatherApi.get("/weather", {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  } catch (err) {
    console.error("weather error:", err.response?.data || err.message);
    throw err;
  }
};

export const getForecastWeather = async (city, unit) => {
  try {
    const response = await weatherApi.get("/forecast", {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  } catch (err) {
    console.error("forecast error:", err.response?.data || err.message);
    throw err;
  }
};
