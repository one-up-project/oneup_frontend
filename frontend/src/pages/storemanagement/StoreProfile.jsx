import React, { useState, useEffect } from "react";
import "./storeprofile.scss";

const StoreProfile = () => {
  const [storeData, setStoreData] = useState({
    name: "Store One Up",
    email: "tienda@example.com",
    phone: "123-456-7890",
    image: "/default-store.jpeg", // Imagen por defecto
  });

  const [previewImage, setPreviewImage] = useState(storeData.image);

  useEffect(() => {
    fetch("/api/store/profile") // Ajusta la ruta según tu backend
      .then((response) => response.json())
      .then((data) => {
        if (data && data.name) {
          setStoreData({
            name: data.name,
            email: data.email || "Sin email",
            phone: data.phone || "Sin teléfono",
            image: data.image || "/default-store.jpg",
          });
          setPreviewImage(data.image || "/default-store.jpg");
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", storeData);
  };

  return (
    <div className="store-profile">
      <div className="store-header">
        <div className="store-image-container">
          <img src={previewImage} alt="Imagen de la tienda" className="store-image" />
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

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
