// App.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css"; // Make sure this import is correct
import * as parkData from "./data/skateboard-parks.json";
import {Icon} from "leaflet"
import locationIcon from './assets/location.svg'

const markerIcon = new Icon({
  iconUrl: locationIcon,
  iconSize: [55,55],
})

export default function App() {
  const [activePark, setActivePark] = useState(null);

  return (
    <MapContainer center={[45.4, -75.7]} zoom={8} scrollWheelZoom={true} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0],
          ]}
          icon = {markerIcon}
          eventHandlers={{
            click: () => {
              setActivePark(park);
            },
          }}
        >
          {activePark === park && (
            <Popup position={[
              park.geometry.coordinates[1],
              park.geometry.coordinates[0],
            ]} onClose={() => setActivePark(null)}>
              <div>
                <h2>{park.properties.NAME}</h2>
                <p>{park.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
