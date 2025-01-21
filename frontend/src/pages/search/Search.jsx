import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Search Page</h1>
    </div>
  );
};

export default Search;
