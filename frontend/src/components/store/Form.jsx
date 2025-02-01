import React, { useState } from 'react';

const Form = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    store_id: '',
    description: '',
    total_price: '',
    discount_price: '',
    pick_up_time: '',
    available: false,
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí enviarás los datos a GraphQL
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Store ID:</label>
        <input
          type="number"
          name="store_id"
          value={formData.store_id}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Precio Total:</label>
        <input
          type="number"
          step="0.01"
          name="total_price"
          value={formData.total_price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Precio con Descuento:</label>
        <input
          type="number"
          step="0.01"
          name="discount_price"
          value={formData.discount_price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Hora de Recogida:</label>
        <input
          type="datetime-local"
          name="pick_up_time"
          value={formData.pick_up_time}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Disponible:</label>
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default Form;