import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "./App.css";
import CustomMarker from "./components/CustomMarker";

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
          />
        ))}
      </div>
    </MapContainer>
  );
};

export default App;
