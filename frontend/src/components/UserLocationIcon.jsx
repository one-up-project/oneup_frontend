import L from "leaflet";
import icono from "../assets/user_location_icon.svg";

export const UserLocationIcon = L.icon({
  iconUrl: icono,
  iconRetinaUrl: icono,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});