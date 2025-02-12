import React, { useState } from "react";
import "./storeprofile.scss";

const StoreProfile = () => {
  const [storeData, setStoreData] = useState({
    name: "Mi Tienda",
    email: "tienda@example.com",
    phone: "123-456-7890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", storeData);
  };

  return (
    <div className="store-profile">
      <h2>Editar Perfil de Tienda</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre de la tienda:</label>
        <input type="text" name="name" value={storeData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={storeData.email} onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="text" name="phone" value={storeData.phone} onChange={handleChange} required />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default StoreProfile;
