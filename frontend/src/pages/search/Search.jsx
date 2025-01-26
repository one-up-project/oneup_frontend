import React, { useEffect, useState } from "react";
import "./search.scss";
import SearchBar from "../../components/search-bar/SearchBar";
import StoreCard from "../../components/store-card/StoreCard";
import MapView from "../../components/MapView";
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

  //data test
  const data = [
    {
      id: 1,
      storeName: "store1",
      description: "description1",
      lat: "23123",
      lon: "39843",
    },
    {
      id: 2,
      storeName: "store2",
      description: "description2",
      lat: "23123",
      lon: "39843",
    },
    {
      id: 3,
      storeName: "store3",
      description: "description3",
      lat: "23123",
      lon: "39843",
    },
    {
      id: 4,
      storeName: "store3",
      description: "description3",
      lat: "23123",
      lon: "39843",
    },
    {
      id: 5,
      storeName: "store3",
      description: "description3",
      lat: "23123",
      lon: "39843",
    },
    {
      id: 6,
      storeName: "store3",
      description: "description3",
      lat: "23123",
      lon: "39843",
    },
  ];

  return (
    <div className="search">
      <div className="card-container">
        <SearchBar />
        {/* mapear obj store a componentes card */}
        {data.map((store) => (
          <StoreCard key={store.id} item={store} />
        ))}
      </div>
      <div className="map-container">
        <MapView />
      </div>
    </div>
  );
};

export default Search;
