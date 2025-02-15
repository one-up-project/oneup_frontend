import React, { useState, useEffect } from "react";
import "./userprofile.scss";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "User OneUp",
    email: "useroneup@example.com",
    phone: "000-000-0000",
    profileImage: "/default-avatar.jpeg", // Imagen por defecto
  });

  useEffect(() => {
    fetch("/api/user") // Ajusta la ruta según tu backend
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setUserData({
            name: data.name,
            email: data.email || "useroneup@example.com",
            phone: data.phone || "000-000-0000",
            profileImage: data.profileImage || "/default-avatar.jpeg",
          });
        }
      })
      .catch((error) => console.error("Error al obtener el usuario:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", userData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, profileImage: imageUrl });

      // Simulación de subir la imagen al servidor
      const formData = new FormData();
      formData.append("file", file);

      fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log("Imagen subida:", data))
        .catch((error) => console.error("Error al subir la imagen:", error));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="user-icon">
          <img src={userData.profileImage} alt="Perfil" className="user-image" />
        </div>
        <h2>{userData.name}</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h3>Actualizar datos</h3>
        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="text" name="phone" value={userData.phone} onChange={handleChange} required />

        <button type="submit">Guardar cambios</button>
      </form>

      <form className="password-form">
        <h3>Cambiar contraseña</h3>
        <label>Contraseña actual:</label>
        <input type="password" required />

        <label>Nueva contraseña:</label>
        <input type="password" required />

        <label>Confirmar nueva contraseña:</label>
        <input type="password" required />

        <button type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );
};

export default UserProfile;
