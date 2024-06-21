import React, { useState } from 'react';

const WeatherForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = city && state
      ? `q=${city},${state}`
      : `lat=${latitude}&lon=${longitude}`;
    fetchWeather(query);
  };
 