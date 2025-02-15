import React, { useState, useEffect } from "react";
import "./userfavorites.scss";

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/user/favorites") // Ajusta la ruta según tu backend
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setFavorites(data);
        } else {
          setFavorites(["Tienda A", "Tienda B"]); // Valores por defecto
        }
      })
      .catch((error) => {
        console.error("Error al obtener favoritos:", error);
        setFavorites(["Tienda A", "Tienda B"]); // Si falla, usa estos
      });
  }, []);

  return (
    <div className="favorites-container">
      <h2>Mis Tiendas Favoritas</h2>
      <div className="favorites-grid">
        {favorites.map((store, index) => (
          <div key={index} className="favorite-item">
            {store}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFavorites;
