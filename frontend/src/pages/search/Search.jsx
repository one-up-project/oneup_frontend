import React, { useEffect, useState } from "react";
import SearchBar from "../../components/search-bar/SearchBar";
const Search = () => {
  //coordenadas actuales por defecto
  const [state, setState] = useState({
    lon: 0,
    lat: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      // ok del usuario
      function (position) {
        setState({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      // rechazo del usuario
      function (error) {
        console.log("ubicacion no compartida", error);
      }
    );
  });

  return (
    <div className="search">
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="map"></div>
    </div>
  );
};

export default Search;
