import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";
import { coordinates } from "../assets/data";

const MapView = () => {
  const [state, setState] = useState({
    concurentLocation: {
      lat: 4.63634,
      lng: -74.083199,
    },
    zoom: 14,
  });

  return (
    <div>
      <h2>Tiendas cercanas a ti</h2>
      <MapContainer center={state.concurentLocation} zoom={state.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers places={coordinates} />
      </MapContainer>
    </div>
  );
};

export default MapView;
