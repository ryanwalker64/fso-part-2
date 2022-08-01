import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const countryData = response.data
      console.log('retrieved')
      setCountries(countryData)
    })
  }, [])

 
  const GetWeather = (country) => {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=a7d156cdeaefed1390ffe6fdbed1a4e6 `)
      .then(response => {
        const weatherIcon = response.data.weather[0].icon
        setWeather(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
        console.log(weatherIcon)
      })
    }
  

  const selectCountry = (e) => {
    setSearch(e)
    const tenResults = countries.filter(country => {
      return country.name.common.includes(search)
    }).slice(0,10)
    setSearchResults(tenResults)
  }

  const handleSearch = (e) => {
    const search = e.target.value
    setSearch(search)
    const tenResults = countries.filter(country => {
      return country.name.common.includes(search)
    }).slice(0,10)

    setSearchResults(tenResults)
    searchResults.length === 1
    ? GetWeather(...tenResults[0].capital)
    : console.log('nothing')
    // console.log(results)
  }

  return (
    <div className="App">
      {countries.length === 0
          ? <h3>Loading API</h3>
          : <CountrySearchForm search={search} handleSearch={handleSearch}/>}
     
     <div>
      {searchResults
        ? searchResults.map((country) => <li>{country.name.common} <button onClick={() => selectCountry(country.name.common)}>Click</button></li>)
        : ''}
        
     </div>
     {searchResults.length === 1
      ? <Country country={searchResults}/>
      : ''}
      {weather !== '' ? <img src={weather} alt='test'/> : ''}
    </div>
  );
}

const CountrySearchForm = (props) => {
  return (
    <div>
      find countries: <input value={props.search} onChange={props.handleSearch}/>
    </div>
  )
}


const Country = ({country}) => {

  const langsARR = Object.values(country[0].languages)
  const langs = langsARR.map(lang => {
    return <li key={lang}>{lang}</li>
  })

  return (
    <div>
      <h1>{country[0].name.common}</h1>
          <h3>Capital: {country[0].capital}</h3>
          <h3>Area: {country[0].area}</h3>
          <h2>Languages</h2>
          <ul>
            {langs}
              
          </ul>
          
    </div>
  )
}

export default App;


// add button to show view of country
// laoding symbol
// refactor the components