import React, { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    const apiKey = "a47d890b9f14d85ff113015fb4ca9d88";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather App</h1>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={getWeather}
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {weatherData && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="text-lg">🌡️ {weatherData.main.temp}&deg;C</p>
            <p>{weatherData.weather[0].main}</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
            <p>🌬️ Wind: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}
