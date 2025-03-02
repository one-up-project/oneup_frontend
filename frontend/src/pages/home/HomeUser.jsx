import React from "react";
import { useAuth } from "../../context/authContext";

const HomeUser = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="layer">
      <h1>Productos disponibles</h1>

      <div>
        {isAuthenticated ? (
            <p>Hola {user.username}</p>
        ) : (
            <p>Debes iniciar sesión para ver los productos</p>
        )}
      </div>
    </div>
  );
};

export default HomeUser;
