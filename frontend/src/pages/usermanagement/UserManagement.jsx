import React, { useState, useEffect } from "react";
import "./usermanagement.scss";

const UserManagement = () => {
  const [user, setUser] = useState({
    name: "User OneUp", // Nombre por defecto
    profileImage: "/default-avatar.jpeg", // Imagen por defecto
  });

  useEffect(() => {
    // Simulación de obtención de datos desde una API
    fetch("/api/user") // 🔹 Asegúrate de que esta ruta sea correcta en el backend
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setUser({
            name: data.name,
            profileImage: data.profileImage || "/default-avatar.jpeg",
          });
        }
      })
      .catch((error) => console.error("Error al obtener el usuario:", error));
  }, []);

  return (
    <div className="user-profile">
      <div className="user-icon">
        <img
          src={user.profileImage}
          alt="Perfil"
          className="user-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-avatar.jpeg"; // Carga imagen de respaldo si hay error
          }}
        />
      </div>
      <div className="user-name">{user.name || "User OneUp"}</div>
    </div>
  );
};

export default UserManagement;
