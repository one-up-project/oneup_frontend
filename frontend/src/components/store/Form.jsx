import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RANDOM_BAG } from '../../graphql/mutations';
import './form.scss';

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

  // Hook para la mutación de GraphQL
  const [createRandomBag] = useMutation(CREATE_RANDOM_BAG);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos del formulario a la mutación
      const { data } = await createRandomBag({
        variables: {
          input: {
            store_id: parseInt(formData.store_id),
            description: formData.description,
            total_price: parseFloat(formData.total_price),
            discount_price: parseFloat(formData.discount_price),
            pick_up_time: formData.pick_up_time,
            available: formData.available,
          },
        },
      });

      // Mostrar mensaje de éxito
      console.log('Random Bag creado:', data.createRandomBag);
      alert('¡Bolsa sorpresa creada exitosamente!');

      // Limpiar el formulario después de enviar
      setFormData({
        store_id: '',
        description: '',
        total_price: '',
        discount_price: '',
        pick_up_time: '',
        available: false,
      });
    } catch (error) {
      // Mostrar mensaje de error
      console.error('Error al crear la bolsa sorpresa:', error);
      alert('Hubo un error al crear la bolsa sorpresa.');
    }
  };

  return (
    <div className="form-container">
      <h1>Crea una bolsa sorpresa</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Store ID:</label>
          <input
            type="number"
            name="store_id"
            value={formData.store_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
          <label>Precio con Descuento:</label>
          <input
            type="number"
            step="0.01"
            name="discount_price"
            value={formData.discount_price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hora de Recogida:</label>
          <input
            type="datetime-local"
            name="pick_up_time"
            value={formData.pick_up_time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Disponible:</label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Guardar</button>
      </form>
    </div>
  );
};

export default Form;