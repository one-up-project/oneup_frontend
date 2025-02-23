import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_RANDOM_BAG } from '../../graphql/mutations';
import { XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import './form.scss';

const UpdateForm = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    random_bag_id: '',
    store_id: '',
    username: '',
    description: '',
    total_price: '',
    discount_price: '',
    pick_up_time: '',
    available: false,
  });

  // Precarga los datos desde localStorage
  useEffect(() => {
    const randomBag = JSON.parse(localStorage.getItem("randomBag")); // Recupera los datos de localStorage
    if (randomBag) {
      console.log("Datos recibidos en el formulario de actualización:", randomBag); // Depuración

      // Formatea la fecha para que sea compatible con datetime-local
      const formattedPickUpTime = randomBag.pick_up_time
        ? randomBag.pick_up_time.slice(0, 16) // Elimina los segundos y milisegundos
        : '';

      setFormData({
        random_bag_id: randomBag.random_bag_id || '',
        store_id: randomBag.store_id || '',
        username: randomBag.username || '',
        description: randomBag.description || '',
        total_price: randomBag.total_price || '',
        discount_price: randomBag.discount_price || '',
        pick_up_time: formattedPickUpTime, // Usa la fecha formateada
        available: randomBag.available || false,
      });

      console.log("Datos precargados en formData:", { // Depuración
        random_bag_id: randomBag.random_bag_id,
        store_id: randomBag.store_id,
        username: randomBag.username,
        description: randomBag.description,
        total_price: randomBag.total_price,
        discount_price: randomBag.discount_price,
        pick_up_time: formattedPickUpTime,
        available: randomBag.available,
      });
    } else {
      console.error("No se encontraron datos de randomBag en localStorage."); // Depuración
    }
  }, []);

  const [updateRandomBag] = useMutation(UPDATE_RANDOM_BAG);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'total_price') {
      const totalPrice = parseFloat(value);
      const discountPrice = totalPrice * 0.7;
      setFormData({
        ...formData,
        [name]: value,
        discount_price: discountPrice.toFixed(0),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

    console.log("Campo cambiado:", name, "Nuevo valor:", value); // Depuración
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const inputData = {
        random_bag_id: parseInt(formData.random_bag_id),
        store_id: parseInt(formData.store_id),
        username: formData.username,
        description: formData.description,
        total_price: parseFloat(formData.total_price),
        discount_price: parseFloat(formData.discount_price),
        pick_up_time: formData.pick_up_time,
        available: formData.available,
      };

      console.log("Datos enviados en la mutación:", inputData); // Depuración

      const { data } = await updateRandomBag({
        variables: {
          input: inputData,
        },
      });

      console.log('Random Bag actualizada:', data.updateRandomBag); // Depuración
      alert('¡Bolsa sorpresa actualizada exitosamente!');
      navigate("/store/home");
    } catch (error) {
      console.error('Error al actualizar la bolsa sorpresa:', error); // Depuración
      alert('Hubo un error al actualizar la bolsa sorpresa.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Actualizar bolsa sorpresa</h1>
        <Link to="/store/home">
          <button className="close-button">
            <XIcon className="icon" />
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
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
            readOnly
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

        <button type="submit" className="submit-button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;