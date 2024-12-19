import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { UserLocationIcon } from "./UserLocationIcon";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";

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
  useEffect(() => {
    fetch(
      `http://localhost:8800/search-ms/stores/get-near-stores/${state.currentLocation.lat}/${state.currentLocation.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Actualizar el estado con los datos
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  }, []);

  return (
    <div>
      <h2>Tiendas cercanas a ti</h2>
      <MapContainer center={state.currentLocation} zoom={state.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* marcadores segun tiendas obtenidas */}
        <Markers places={data} />
        {/* marcador posicion usuario actual */}
        <Marker
          position={[state.currentLocation.lat, state.currentLocation.lng]}
          icon={UserLocationIcon}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;
