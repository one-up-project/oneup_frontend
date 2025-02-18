import React from "react";
import "./homeStore.scss";
import CardSotre from "../../../components/home/CardStore";
import { Link } from "react-router-dom";
const HomeStore = () => {
  return (
    <div className="layer">
      <h1>Lista de publicaciones</h1>
      <Link to="/store/form">
        <button className="add-store-btn">Agregar Tienda</button>
      </Link>
      <div className="cards">
        <CardSotre />
      </div>
    </div>
  );
};

export default HomeStore;
