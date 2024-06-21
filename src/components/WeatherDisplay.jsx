import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherDisplay = ({ weather }) => (
  <div className="weather-display">
    <h3>Weather Report</h3>
    <WeatherCard title="Temperature" value={`${weather.main.temp}°K`} />
    <WeatherCard title="Humidity" value={`${weather.main.humidity}%`} />
    <WeatherCard title="Conditions" value={weather.weather[0].description} />
  </div>
);

export default WeatherDisplay;
