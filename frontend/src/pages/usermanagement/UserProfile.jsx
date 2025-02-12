import React, { useState } from "react";
import "./userprofile.scss";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {  // Cambia Profile a UserProfile aquí
  const [userData, setUserData] = useState({
    name: "Juan Pérez",
    email: "juanperez@example.com",
    phone: "123-456-7890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", userData);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle className="user-icon" />
        <h2>{userData.name}</h2>
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

export default UserProfile;  // Aquí ya coincide con el nombre del componente
