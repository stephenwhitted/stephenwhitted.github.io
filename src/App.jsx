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
  const [isDayTime, setIsDayTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${import.meta.env.VITE_API_KEY}`);
      setWeather(response.data);
      setDayNightMode(response.data.sys.sunrise, response.data.sys.sunset);
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
    <div className={`App ${isDayTime ? 'day' : 'night'}`}>
      <Header />
      <WeatherForm fetchWeather={fetchWeather} />
      {loading && <Loader />}
      {error && <Error message={error} />}
      {weather && <WeatherDisplay weather={weather} />}
      <Footer />
    </div>
  );
}

export default App;
