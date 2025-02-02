import React, { useEffect, useState } from "react";
import "./search.scss";
import SearchBar from "../../components/search-bar/SearchBar";
import StoreCard from "../../components/store-card/StoreCard";
import MapView from "../../components/MapView";

const Search = () => {
  //info de las tiendas consultadas
  const [data, setData] = useState([]);

  // peticion servicio search para busqueda de tiendas bajo los parametros establecidos
  const handleSearch = (storeName, storeCategory) => {
    let url = `http://localhost:8800/search-ms/stores/get-stores-by-name/${storeName}/${storeCategory}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Actualizar el estado con los datos
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  };

  return (
    <div className="search">
      <div className="card-container">
        <SearchBar onSearch={handleSearch} />
        {/* mapear obj store a componentes card */}
        {data.map((store) => (
          <StoreCard key={store.id_store} item={store} />
        ))}
      </div>
      <div className="map-container">
        <MapView />
      </div>
    </div>
  );
};

export default Search;
