import React from "react";
import UserCard from "../../../components/user/UserCard";
const HomeUser = () => {
  //establecer datos del usuario
  localStorage.setItem("user", JSON.stringify({ id: 1 }));

  return (
    <div className="layer">
      <h1>Bienvenido, aqui encontrarás las bolsas sorpresa disponibles</h1>
      <div className="cards">
        <UserCard />
      </div>
    </div>
  );
};

export default HomeUser;
