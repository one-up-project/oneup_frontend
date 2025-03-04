import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RANDOM_BAG } from '../../graphql/mutations';
import { XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import './form.scss';

const Form = () => {
  const { user, isAuthenticated } = useAuth(); // Obtén el usuario autenticado
  const location = useLocation();
  const [formData, setFormData] = useState({
    store_id: user?.id || '', // Usa el ID del usuario autenticado
    username: user?.username || '', // Usa el nombre de usuario autenticado
    description: '',
    total_price: '',
    discount_price: '',
    pick_up_time: '',
    available: false,
  });

  // Precarga los datos si hay un estado en la ubicación
  useEffect(() => {
    console.log("location.state en UpdateForm:", location.state); // Depuración
    if (location.state && location.state.randomBag) {
      const { randomBag } = location.state;
      console.log("Datos recibidos en el formulario:", randomBag); // Depuración
      setFormData({
        store_id: randomBag.store_id || user?.id || '',
        username: randomBag.username || user?.username || '',
        description: randomBag.description || '',
        total_price: randomBag.total_price || '',
        discount_price: randomBag.discount_price || '',
        pick_up_time: randomBag.pick_up_time || '',
        available: randomBag.available || false,
      });
    }
  }, [location.state, user]);

  const [createRandomBag] = useMutation(CREATE_RANDOM_BAG);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si el campo que cambia es total_price, calcula el 30% de descuento
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si el usuario está autenticado
    if (!isAuthenticated || !user?.id || !user?.username) {
      alert("Debes iniciar sesión para crear una bolsa sorpresa.");
      return;
    }

    try {
      const { data } = await createRandomBag({
        variables: {
          input: {
            store_id: parseInt(user.id), // Usa el ID del usuario autenticado
            username: user.username, // Usa el nombre de usuario autenticado
            description: formData.description,
            total_price: parseFloat(formData.total_price),
            discount_price: parseFloat(formData.discount_price),
            pick_up_time: formData.pick_up_time,
            available: formData.available,
          },
        },
      });

      console.log('Random Bag creado:', data.createRandomBag);
      alert('¡Bolsa sorpresa creada exitosamente!');

      // Reinicia el formulario
      setFormData({
        store_id: user.id,
        username: user.username,
        description: '',
        total_price: '',
        discount_price: '',
        pick_up_time: '',
        available: false,
      });
    } catch (error) {
      console.error('Error al crear la bolsa sorpresa:', error);
      alert('Hubo un error al crear la bolsa sorpresa.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>{location.state ? "Actualizar bolsa sorpresa" : "Crear bolsa sorpresa"}</h1>
        <Link to="/store/home">
          <button className="close-button">
            <XIcon className="icon" />
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Campo store_id oculto o no editable */}
        <input
          type="hidden"
          name="store_id"
          value={formData.store_id}
        />

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
          {location.state ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default Form;