import React from "react";
import "./home2.scss"; // Mantenemos los estilos del primer componente
import CardStore from "../../components/home/CardStore"; // Corregimos el nombre del componente
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