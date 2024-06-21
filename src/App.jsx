import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';
import Error from './components/Error';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isDayTime, setIsDayTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');

  const fetchWeather = async (query) => {
    setLoading(true);
    setError('');
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${import.meta.env.VITE_API_KEY}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${import.meta.env.VITE_API_KEY}`);
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list.slice(0, 8)); // Get the next 24 hours (3-hour intervals)
      setDayNightMode(weatherResponse.data.sys.sunrise, weatherResponse.data.sys.sunset);
      setWeatherCondition(weatherResponse.data.weather[0].main.toLowerCase());
    } catch (err) {
      setError('Failed to fetch weather data. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const setDayNightMode = (sunrise, sunset) => {
    const currentTime = Math.floor(Date.now() / 1000);
    setIsDayTime(currentTime >= sunrise && currentTime <= sunset);
  };

  useEffect(() => {
    if (weather) {
      setDayNightMode(weather.sys.sunrise, weather.sys.sunset);
    }
  }, [weather]);

  return (
    <div className={`App ${isDayTime ? 'day' : 'night'} ${weatherCondition}`}>
      <Header />
      {loading && <Loader />}
      {error && <Error message={error} />}
      <div className="content-container">
        <div className="form-container">
          <WeatherForm fetchWeather={fetchWeather} />
        </div>
        <div className="map-container">
          {weather && <WeatherDisplay weather={weather} forecast={forecast} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
