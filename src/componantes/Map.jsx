import React from 'react'
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "./Map.css";



const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
};


function handlePosition(lat, long) {
    if(lat !== undefined || long !== undefined) {
        return [lat, long];
    }
    else {
        return [44.434659, -1.316971];
    }
}




function showDataOnMap(data, casesType='cases') {
    return data.map(country => (
        <Circle 
            center={handlePosition(country.countryInfo.lat, country.countryInfo.long)}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={ Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier }
        >
            <Popup>
                <div className="infoContainer">
                    <div 
                        className="infoFlag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}>
                    </div>

                    <div className="infoName">{country.country}</div>

                    <div className="infoCases">Cases: {numeral(country.cases).format("0,0")}</div>

                    <div className="infoRecovered">Recovered: {numeral(country.recovered).format("0,0")}</div>

                    <div className="infoDeaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
}






function Map({ countries, casesType, center, zoom }) {

    
    return (
        <div className="map">
            
            <LeafletMap className="mapContainer" center={center} zoom={zoom}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>

        </div>
    )
}

export default Map;
