import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setWeatherData(null);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city.trim());
    } else {
      setError("Please enter a city name.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Weather App</h1>
        <div className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weatherData && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">{weatherData.location.name}</h2>
            <p className="text-lg">{weatherData.current.condition.text}</p>
            <img
              src={weatherData.current.condition.icon}
              alt="Weather Icon"
              className="mx-auto"
            />
            <p className="text-lg">
              Temperature: {weatherData.current.temp_c}°C
            </p>
            <p className="text-sm text-gray-600">
              Last updated: {weatherData.current.last_updated}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
