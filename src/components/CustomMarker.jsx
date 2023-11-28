import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import red from "../assets/red.png";
import green from "../assets/green.png";
import DateFormat from './DateFormat';

const CustomMarker = ({ position, magnitude, date }) => {
 
    const markerIcon =
      magnitude > 4.5
        ? new Icon({ iconUrl: red, iconSize: [25, 41] })
        : new Icon({ iconUrl: green, iconSize: [25, 41] });

    return (
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <div>
            <h3>Date: <DateFormat timestamp={date} /></h3>
            <h3>Magnitude: {magnitude}</h3>
          </div>
        </Popup>
      </Marker>
    );
  
}

export default CustomMarker