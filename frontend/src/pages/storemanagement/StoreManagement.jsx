import React, { useState, useEffect } from "react";
import "./storemanagement.scss";

const StoreManagement = () => {
  const [storeData, setStoreData] = useState({
    name: "Store One Up",
    description: "Tienda de ejemplo",
    image: "/default-store.jpeg", // Imagen predeterminada
  });

  useEffect(() => {
    fetch("/api/store/profile") // Ajusta la ruta según tu backend
      .then((response) => response.json())
      .then((data) => {
        if (data && data.name) {
          setStoreData({
            name: data.name,
            description: data.description || "Sin descripción",
            image: data.image || "/default-store.jpg",
          });
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, []);

  return (
    <div className="store-management">
      <div className="store-header">
        <div className="store-icon">
          <img src={storeData.image} alt="Perfil de la tienda" className="store-image" />
        </div>
        <h2 className="store-name">{storeData.name}</h2>
        <p className="store-description">{storeData.description}</p>
      </div>

      <div className="store-links">
        <a href="/storemanagement/profile">Editar Perfil</a>
        <a href="/storemanagement/history">Historial</a>
      </div>
    </div>
  );
};

export default StoreManagement;
