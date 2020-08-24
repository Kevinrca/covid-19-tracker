import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from "@material-ui/core";
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map.jsx"



function App() {

  const apiURL = "https://disease.sh/v3/covid-19/countries";

  // Variables
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");


  // API call to get the countries
  useEffect(() => {
    async function getCountriesData() {
      await fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          // Return an object with the name and the code of the country
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          setCountries(countries);
        })
    }
    getCountriesData();
  }, []);


  // handle the change the country when clicking on the dropdown menu
  async function onCountryChange(event) {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }


  return (
    <div className="App">
      <div className="app__left">
        
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox 
            title="Cases"
            cases="4321082"
            total="Total: 5000000">
          </InfoBox>

          <InfoBox 
            title="Recoverded"
            cases="4321082"
            total="Total: 5000000">
          </InfoBox>
            
          <InfoBox 
            title="Deaths"
            cases="4321082"
            total="Total: 5000000">
          </InfoBox>
        </div>

        <Map />
      </div>

      
      
    </div>
  );
}

export default App;
