import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowCountries = ({ countries, setCountries, weather, setWeather }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filte</div>
  }
  if (countries.length < 10 && countries.length > 1) {
    return  (
      <div>
        {countries.map(country => <Country key={country.name} country={country} setCountries={setCountries}/>)}
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      countries.map(country => <OneCountry country={country} key={country.name} weather={weather} setWeather={setWeather} />)
    )
  }
  return ""
}

const Country = ({ country, setCountries }) => {
  return (
    <div>
      {country.name}
      <Button country={country} setCountries={setCountries}/>
    </div>
  )
}

const OneCountry = ({ country, weather, setWeather }) => {
  return (
    <> 
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
      </div> 
      <div>
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(
          language => <li key={language.name} >{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt="Flag of the country" width="200" heigth="200" />
      <h2>Weather in {country.capital}</h2>
      <Weather country={country} weather={weather} setWeather={setWeather} />
    </>
  )
}

const Weather = ({ country, weather, setWeather }) => {
  const api = process.env.REACT_APP_API_KEY
  const axios = require('axios');
  const params = {
    access_key: api,
    query: country.capital
  }

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data.current)
      }).catch(error => {
        console.log(error);
      })
    }, [])

    return (
      <>
        <div>
          <b>temperature:</b> {weather.temperature} Celcius
        </div>
        <img src={weather.weather_icons} alt="Current weather" width="50" heigth="50"/>
        <div>
          <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
        </div>
      </>
    )
}


const Button = ({ country, setCountries }) => {
  return (
    <button onClick={() => 
      setCountries([country])
    }>
      show
    </button>
  )
}


function App() {

  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState([])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = search === ''
    ? []
    : countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))

  return (
    <>
      <div>
        find countries 
        <input value={search} onChange={handleSearchChange} />
      </div>
      <div>
        <ShowCountries countries={countriesToShow} setCountries={setCountries} weather={weather} setWeather={setWeather}/>
      </div>
    </>
  );
}

export default App;
