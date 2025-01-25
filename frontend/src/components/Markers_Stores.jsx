import React from "react";
import { LocationIcon } from "./LocationIcon";
import { Marker, Popup } from "react-leaflet";

const Markers_Stores = (props) => {
  const { places } = props;
  const markers = places.map((place, i) => (
    <Marker key={i} position={[place.lat, place.lon]} icon={LocationIcon}>
      <Popup>
        <a href="#">{place.store_name}</a>
        {/* permitir al usuario dar clic al icono para redireccionarlo a 
        la tienda respectiva */}
      </Popup>
    </Marker>
  ));

  return markers;
};

export default Markers_Stores;
