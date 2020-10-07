import React, { useState, useEffect } from 'react'
import axios from 'axios';

// added for exercise 2.14
const Weather = ({ city, country }) => {
  // loading state set to true by default
  const [ loading, setLoading ] = useState(true);
  const [ weather, setWeather ] = useState({});

  // country added to search query for more accurate results
  // sets loading state to false when server returns data
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${ process.env.REACT_APP_API_KEY }&query=${ city }%20${ country }`)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      });
  }, [city, country]);
  
  // displays a message if loading is true, the weather if loading is false and data has been received
  const showWeather = loading 
    ? <h2>Waiting for weather to load...</h2>
    : [ <h2 key="city">Weather in { weather.location.name }:</h2>,
        <p key="temp">Temperature: { weather.current.temperature }°C </p>,
        <img key="icon" src={ weather.current.weather_icons[0] } alt="Current Weather" />,      
        <p key="speed">Wind Speed: { weather.current.wind_speed } km/h</p>];  

  return (
    <div>
      { showWeather }
    </div>
  );
}

export default Weather;