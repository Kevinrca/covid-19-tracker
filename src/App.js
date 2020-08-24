import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from "@material-ui/core";
import './App.css';

function App() {

  const apiURL = "https://disease.sh/v3/covid-19/countries";

  // Variables
  const [countries, setCountries] = useState([]);
  

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
  


  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>
      
    </div>
  );
}

export default App;
