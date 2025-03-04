import React, {  useState } from "react";
import "./search.scss";
import SearchBar from "../../components/search-bar/SearchBar";
import StoreCard from "../../components/store-card/StoreCard";
import MapView from "../../components/MapView";
import { gql, useLazyQuery } from "@apollo/client";

const Search = () => {
  //info de las tiendas consultadas
  const [stores_data, setStores_data] = useState([]);

  // apollo client
  // implementacion query graphql obtener tiendas a partir del nombre o categoria
  const GET_STORES_BY_NAME = gql`
    query Query($name: String, $category: String) {
      getStoresByName(name: $name, category: $category) {
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

  // ----------------------------------------------------------------

  // funcion fetch
  const [getData, { error }] = useLazyQuery(GET_STORES_BY_NAME, {
    onCompleted: (data) => {
      //actualizar variable de estado con los datos obtenidos
      setStores_data(data.getStoresByName);
      console.log(data);
    },
  });

  // peticion servicio search para busqueda de tiendas bajo los parametros establecidos
  const handleSearch = (storeName, storeCategory) => {
    //validar campo "name"
    //campo category=all por defecto
    if (storeName.trim() == "") {
      storeName = storeName + "all";
    }
    //log de parametros
    console.log("name, category: ", storeName, storeCategory);
    // Ejecutar consulta
    getData({ variables: { name: storeName, category: storeCategory } });
  };

  return (
    <div className="search">
      <div className="card-container">
        <SearchBar onSearch={handleSearch} />
        {/* mapear obj store a componentes card */}
        {stores_data.map((store) => (
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
