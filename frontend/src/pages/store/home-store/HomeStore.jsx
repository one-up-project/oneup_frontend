import React from "react";
import "./homeStore.scss"; 
import CardStore from "../../../components/random-bag/CardStore";
import { Link } from "react-router-dom";

const Home2 = () => {
  // Establecer datos de la tienda en localStorage (lógica del segundo componente)
  localStorage.setItem("store", JSON.stringify({ id: 1 }));

  return (
    <div className="layer">
      <h1>Lista de publicaciones</h1>
      <Link to="/store/form">
        <button className="add-store-btn">Agregar bolsa sorpresa</button>
      </Link>
      <div className="cards">
        <CardStore />
      </div>
    </div>
  );
};

export default Home2;