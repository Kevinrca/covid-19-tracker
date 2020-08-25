import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, CardContent, Card } from "@material-ui/core";
import './App.css';

import InfoBox from "./componantes/InfoBox";
import Map from "./componantes/Map.jsx";
import Table from './componantes/Table.jsx';
import LineGraph from "./componantes/LineGraph";
import "leaflet/dist/leaflet.css";



// Sorting the data in decreasing mode
function sortData(data) {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
      if(a.cases > b.cases) {
          return -1;
      }
      else {
          return 1;
      }
  })

  return sortedData;
}





function App() {

  // Variables
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 44.434659, lng:  -1.316971 });
  const [mapZoom, setMapZoom] = useState(2);





  // Dipslay the wordwide infos at loading
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, []);

  // API call to get the countries
  useEffect(() => {
    async function getCountriesData() {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          // Return an object with the name and the code of the country
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        })
    }
    getCountriesData();
  }, []);




  

  // handle the change the country when clicking on the dropdown menu
  async function onCountryChange(event) {
    const countryCode = event.target.value;
    setCountry(countryCode);
    
    let apiURL;
    if(countryCode === "Worldwide") {
      apiURL = "https://disease.sh/v3/covid-19/all"
    }
    else {
      apiURL = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    }

    await fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
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
            cases={countryInfo.todayCases}
            total={countryInfo.cases}>
          </InfoBox>

          <InfoBox 
            title="Recoverded"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}>
          </InfoBox>
            
          <InfoBox 
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}>
          </InfoBox>
        </div>

        <Map 
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>



      <Card className="app__right">
        <CardContent>

          <h3>Live Cases by Country</h3>
          <Table countries={tableData}></Table>


          <h3>Worldwide new cases</h3>
          <LineGraph />

        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
