import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
// import ErrorBoundary from './component/ErrorBoundary';
import "./App.css";

const App = () => {
  const [earthquakeData, setEarthquakeData] = useState();
// const userURL = 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        );

        setEarthquakeData(response.data.features);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };
    fetchData();
  }, []);

  // fetch(userURL)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  //   console.log('Data:', data);
  //   let features = data.features;
  //   console.log('features',features);
  //    for (var i = 0; i < features.length; i++) {
  //         var feature = features[i];
  //         var coordinates = feature.geometry.coordinates;
  //         console.log('coordinates: ',coordinates);
  //       }
  // })
  // .catch(error => {
  //   console.log('Error retrieving user data:', error);
  // });

  if(!earthquakeData) return null
  return (
    <MapContainer center={[45.4, -75.7]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    <div>
      {/* <h1>Earthquake Data</h1> */}
      {console.log(earthquakeData)}
      {
        earthquakeData.map(data =>(
          <Marker key={data.properties.id} position={[data.geometry.coordinates[1],data.geometry.coordinates[0]]} />
        ))
      }
      {/* <Marker position={[earthquakeData.geometry.coordinates[1],earthquakeData.geometry.coordinates[0]]} /> */}
      {/* <ul>
        {earthquakeData.map((earthquake) => (
          <li key={earthquake.properties.id}>
            Coordinates: {earthquake.geometry.coordinates}
          </li>
        ))}
      </ul> */}
      {/* {earthquakeData.type} */}
    </div>
    </MapContainer>

  );
}

export default App;