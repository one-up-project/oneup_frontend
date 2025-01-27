import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { UserLocationIcon } from "./UserLocationIcon";
import "leaflet/dist/leaflet.css";
import "./mapView.scss";
import Markers_Stores from "./Markers_Stores";

const MapView = () => {
  const mapRef = useRef(null); // Referencia al mapa

  //coordenadas por defecto (unal bogota)
  const [state, setState] = useState({
    currentLocation: {
      lat: 4.6453,
      lng: -74.07455,
    },
    zoom: 14,
  });

  //obtener ubicacion actual de usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      // ok del usuario
      function (position) {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Actualizar estado con la nueva ubicación
        setState((prevState) => ({
          ...prevState,
          currentLocation: newLocation,
        }));
        // Centrar el mapa en la nueva ubicación
        if (mapRef.current) {
          const map = mapRef.current;
          map.setView([newLocation.lat, newLocation.lng], state.zoom);
        }
      },
      // rechazo del usuario
      function (error) {
        console.log("ubicacion no compartida", error);
      }
    );
  }, [state.zoom]);

  const [data, setData] = useState([]);
  // peticion servicio search para busqueda de tiendas en un radio de 2km
  useEffect(() => {
    fetch(
      `http://localhost:8800/search-ms/stores/get-near-stores/${state.currentLocation.lat}/${state.currentLocation.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Actualizar el estado con los datos
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  }, [state.currentLocation]);

  return (
    <MapContainer
      center={state.currentLocation}
      zoom={state.zoom}
      className="view-map"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* marcadores segun tiendas obtenidas */}

      <Markers_Stores data={data} />

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
