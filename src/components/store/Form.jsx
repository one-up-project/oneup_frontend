import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RANDOM_BAG } from '../../graphql/mutations';
import { XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import './form.scss';

const Form = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    store_id: '',
    description: '',
    total_price: '',
    discount_price: '',
    pick_up_time: '',
    available: false,
  });

  // Si hay datos en el estado de la ubicación (location.state), prellenamos el formulario
  useEffect(() => {
    if (location.state && location.state.randomBag) {
      const { randomBag } = location.state;
      setFormData({
        store_id: randomBag.store_id,
        description: randomBag.description,
        total_price: randomBag.total_price,
        discount_price: randomBag.discount_price,
        pick_up_time: randomBag.pick_up_time,
        available: randomBag.available,
      });
    }
  }, [location.state]);
  
  const [createRandomBag] = useMutation(CREATE_RANDOM_BAG);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si el campo que cambia es total_price, calculamos el 30% y lo asignamos a discount_price
    if (name === 'total_price') {
      const totalPrice = parseFloat(value);
      const discountPrice = totalPrice * 0.3;
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
    try {
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

      console.log('Random Bag creado:', data.createRandomBag);
      alert('¡Bolsa sorpresa creada exitosamente!');

      setFormData({
        store_id: '',
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