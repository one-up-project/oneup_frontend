import React from "react";
import { Marker } from "react-leaflet";

const Markers = (props) => {
  const { places } = props;
  const markers = places.map((place, i) => (
    <Marker key={i} position={place.geometry} icon={place.icon} />
  ));

    return markers;
};

export default Markers;
