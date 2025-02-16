import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { UserLocationIcon } from "./UserLocationIcon";
import "leaflet/dist/leaflet.css";
import "./mapView.scss";
import Markers_Stores from "./Markers_Stores";
import { gql, useQuery } from "@apollo/client";

const MapView = () => {
  const mapRef = useRef(null); // Referencia al mapa

  //coordenadas por defecto (unal bogota)
  const [state, setState] = useState({
    currentLocation: {
      lat: 4.63777,
      lng: -74.084,
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

        //log de coordenadas y precision de ubicacion
        console.log("precision coordenadas (m):", position.coords.accuracy);
        console.log("coordenadas", newLocation.lat, newLocation.lng);
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

  const [stores_data, setStores_data] = useState({ stores: [] });

  // ----------------------------------------------------------------
  // fetch
  // peticion servicio search para busqueda de tiendas en un radio de 2km
  // useEffect(() => {
  //   fetch(
  //     `http://localhost:8800/search-ms/stores/get-near-stores/${state.currentLocation.lat}/${state.currentLocation.lng}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data); // Actualizar el estado con los datos
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error al hacer la petición:", error);
  //     });
  // }, [state.currentLocation]);
  // ----------------------------------------------------------------
  // apollo client
  // implementacion query graphql obtener tiendas cercanas al usuario
  const GET_NEAR_STORES = gql`
    query Query($lat: Float!, $lon: Float!) {
      getNearStores(lat: $lat, lon: $lon) {
        id_store
        store_name
        description
        category
        location {
          lat
          lon
        }
      }
    }
  `;

  // invocar consulta
  const { loading, error, data } = useQuery(GET_NEAR_STORES, {
    //definir variables
    variables: {
      lat: state.currentLocation.lat,
      lon: state.currentLocation.lng,
    },
  });

  //log resultados obtenidos
  useEffect(() => {
    if (data) {
      //actualizar datos de tiendas obtenidas
      setStores_data((prev) => ({ ...prev, stores: data.getNearStores }));
      // log resultados
      console.log(data);
    }
  }, [data]);

  //log error
  if (error) {
    console.log(error);
  }

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

      <Markers_Stores data={stores_data.stores || []} />

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
