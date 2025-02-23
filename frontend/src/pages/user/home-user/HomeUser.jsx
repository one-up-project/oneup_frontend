import React from "react";
import CardStore from "../../../components/random-bag/CardStore";

const HomeUser = () => {
  localStorage.setItem("user", JSON.stringify({ id: 1 }));

  return (
    <div className="layer">
      <h1>Bienvenido, aqui encontraràs las bolsas sorpresa disponibles</h1>
      <div className="cards">
        <CardStore />
      </div>
    </div>
  );
};

export default HomeUser;
