import React from "react";
import { LocationIcon } from "./LocationIcon";
import { Marker } from "react-leaflet";

const Markers = (props) => {
  const { places } = props;
  const markers = places.map((place, i) => (
    <Marker key={i} position={[place.lat, place.lon]} icon={LocationIcon} />
  ));

  return markers;
};

export default Markers;
