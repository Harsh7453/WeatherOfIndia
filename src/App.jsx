import React, { useState } from 'react';
import './App.css';

const API_KEY = '100af590efdc339098ea2f16e493a080'; 

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch weather data');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.');
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather();
    }
  };

  return (
    <div className="App">
      <h1>Weather of India</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="weather-details">
            <p>{weatherData.weather[0].main}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
