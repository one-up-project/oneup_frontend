import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { UserLocationIcon } from "./UserLocationIcon";
import "leaflet/dist/leaflet.css";
import "./mapView.scss";
import Markers_Stores from "./Markers_Stores";

const MapView = () => {
  //ubicacion del usuario actual
  const [state, setState] = useState({
    currentLocation: {
      lat: 4.63634,
      lng: -74.083199,
    },
    zoom: 14,
  });

  const [data, setData] = useState([]);
  // peticion servicio search para busqueda de tiendas en un radio de 2km
  // useEffect(() => {
  //   fetch(
  //     `http://localhost:8800/search-ms/stores/get-near-stores/${state.currentLocation.lat}/${state.currentLocation.lng}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data); // Actualizar el estado con los datos
  //     })
  //     .catch((error) => {
  //       console.error("Error al hacer la petición:", error);
  //     });
  // }, []);

  return (
    <MapContainer
      center={state.currentLocation}
      zoom={state.zoom}
      className="view-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* marcadores segun tiendas obtenidas */}
      {/* <Markers_Stores places={data} /> */}
      {/* marcador posicion usuario actual */}
      <Marker
        position={[state.currentLocation.lat, state.currentLocation.lng]}
        icon={UserLocationIcon}
      >
        <Popup>Tu ubicación actual.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
