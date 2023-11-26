import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Icon } from "leaflet";
import red from "./assets/red.png";
import green from "./assets/green.png";
import "./App.css";

const App = () => {
  const [earthquakeData, setEarthquakeData] = useState();

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

  const CustomMarker = ({ position, magnitude, date }) => {
    // Define different marker icons based on magnitude
    const markerIcon =
      magnitude > 6
        ? new Icon({ iconUrl: red, iconSize: [25, 41] })
        : new Icon({ iconUrl: green, iconSize: [25, 41] });

    return (
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <div>
            <h3>Date: {formatDate(date)}</h3>
            <h3>Magnitude: {magnitude}</h3>
          </div>
        </Popup>
      </Marker>
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();

    // Add leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  if (!earthquakeData) return null;
  return (
    <MapContainer center={[45.4, -75.7]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <div>
        {/* {console.log(earthquakeData)} */}
        {earthquakeData.map((data) => (
          <CustomMarker
            key={data.properties.id}
            position={[
              data.geometry.coordinates[1],
              data.geometry.coordinates[0],
            ]}
            magnitude={data.properties.mag}
            date={data.properties.time}
          >
            <Popup>
              {/* <h3>Date: {formatDate(data.properties.time)}</h3>
              <h3>Magnitude: {data.properties.mag}</h3> */}
            </Popup>
          </CustomMarker>
        ))}
      </div>
    </MapContainer>
  );
};

export default App;
