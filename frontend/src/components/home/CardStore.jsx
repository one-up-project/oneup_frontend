import { useQuery, useMutation } from '@apollo/client';
import { GET_RANDOM_BAGS } from '../../graphql/queries';
import { DELETE_RANDOM_BAG } from '../../graphql/mutations';
import {  useNavigate } from "react-router-dom"; // Importa useNavigate
import "./cardstore.scss";

const CardStore = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  // Obtener los datos de random_bag
  const { loading, error, data } = useQuery(GET_RANDOM_BAGS, {
    fetchPolicy: "network-only", 
  });

  console.log("Renderizando CardStore"); 
  console.log("Datos recibidos en el frontend:", data); 

  // Mutación para eliminar una random_bag
  const [deleteRandomBag] = useMutation(DELETE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }], 
  });

  // Función para manejar la eliminación
  const handleDelete = async (random_bag_id) => {
    try {
      console.log("Intentando eliminar random_bag con ID:", random_bag_id); 
      await deleteRandomBag({ variables: { random_bag_id } });
      alert('Random Bag eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar la Random Bag:', err);
      alert('Hubo un error al eliminar la Random Bag');
    }
  };

  // Función para manejar la actualización
  const handleUpdate = (randomBag) => {
    // Guarda los datos de randomBag en localStorage
    localStorage.setItem("randomBag", JSON.stringify(randomBag));
    // Redirige al formulario de actualización
    navigate("/store/update_form");
  };

  if (loading) {
    console.log("Cargando datos..."); 
    return <p>Cargando...</p>;
  }

  if (error) {
    console.error("Error al obtener los datos:", error); 
    return <p>No hay ninguna bolsa creada</p>;
  }

  // Verificar si data.randomBags existe antes de mapearlo
  if (!data || !data.randomBags) {
    console.log("No hay datos disponibles"); 
    return <p>No hay datos disponibles</p>;
  }

  console.log("Datos a renderizar:", data.randomBags); 

  return (
    <div className="card-container">
      {data.randomBags.map((randomBag) => (
        <div className="card" key={randomBag.random_bag_id}>
          <div className="card-content">
            <div className="card-info">
              <span className="price">{randomBag.discount_price} €</span>
            </div>
            <h3 className="title">{randomBag.username}</h3> {/* Mostrar el nombre de la tienda */}
            <p className="pickup-time">Tiempo de recogida {randomBag.pick_up_time}</p>
            <p className="see-more">{randomBag.description}</p>

            {/* Botones de actualizar y eliminar */}
            <div className="card-actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(randomBag)} // Pasa randomBag a la función
              >
                <span>Actualizar</span>
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(randomBag.random_bag_id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStore;