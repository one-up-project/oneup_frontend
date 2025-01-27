import React from "react";
import { LocationIcon } from "./LocationIcon";
import { Marker, Popup } from "react-leaflet";

const Markers_Stores = ({ data }) => {
  //const { data } = props;
  const markers = data.map((place, i) => (
    <Marker
      key={i}
      position={[place.location.lat, place.location.lon]}
      icon={LocationIcon}
    >
      <Popup>
        <a href="#">{place.store_name}</a>
        {/* permitir al usuario dar clic al icono para redireccionarlo a 
        la tienda respectiva
        navegar a la pagina de la tienda */}
      </Popup>
    </Marker>
  ));

  return <>{markers}</>;
};

export default Markers_Stores;
