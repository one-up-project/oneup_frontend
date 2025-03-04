import React from "react";
import "./homeStore.scss";
import CardStore from "../../../components/random-bag/CardStore";
import { Link } from "react-router-dom";
const HomeStore = () => {
  //establecer datos de la tienda
  localStorage.setItem("store", JSON.stringify({ id: 1 }));

  return (
    <div className="layer">
      <h1>Lista de publicaciones</h1>
      <Link to="/store/form">
        <button className="add-store-btn">Agregar Bolsa Sorpresa</button>
      </Link>
      <div className="cards">
        <CardStore />
      </div>
    </div>
  );
};

export default HomeStore;
