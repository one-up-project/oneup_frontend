import { useQuery, useMutation } from '@apollo/client';
import { GET_RANDOM_BAGS } from '../../graphql/queries';
import { DELETE_RANDOM_BAG } from '../../graphql/mutations';
import "./cardstore.scss";

const CardStore = () => {
  // Obtener los datos de random_bag
  const { loading, error, data } = useQuery(GET_RANDOM_BAGS, {
    fetchPolicy: "network-only", // Evita que los datos en caché se sumen a la consulta
  });

  console.log("Renderizando CardStore"); // Log para verificar cuántas veces se renderiza el componente
  console.log("Datos recibidos en el frontend:", data); // Log para depuración de los datos recibidos

  // Mutación para eliminar una random_bag
  const [deleteRandomBag] = useMutation(DELETE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }], // Recargar los datos después de eliminar
  });

  // Función para manejar la eliminación
  const handleDelete = async (random_bag_id) => {
    try {
      console.log("Intentando eliminar random_bag con ID:", random_bag_id); // Log para depuración
      await deleteRandomBag({ variables: { random_bag_id } });
      alert('Random Bag eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar la Random Bag:', err);
      alert('Hubo un error al eliminar la Random Bag');
    }
  };

  // Función para manejar la actualización (puedes redirigir a un formulario de edición)
  const handleUpdate = (random_bag_id) => {
    console.log('Actualizar Random Bag con ID:', random_bag_id); // Log para depuración
    // Aquí puedes redirigir a un formulario de edición o abrir un modal
  };

  if (loading) {
    console.log("Cargando datos..."); // Log para depuración
    return <p>Cargando...</p>;
  }

  if (error) {
    console.error("Error al obtener los datos:", error); // Log para depuración
    return <p>No hay ninguna bolsa creada</p>;
  }

  // Verificar si data.randomBags existe antes de mapearlo
  if (!data || !data.randomBags) {
    console.log("No hay datos disponibles"); // Log para depuración
    return <p>No hay datos disponibles</p>;
  }

  console.log("Datos a renderizar:", data.randomBags); // Log para depuración

  return (
    <div className="card-container">
      {data.randomBags.map((randomBag) => (
        <div className="card" key={randomBag.random_bag_id}>
          <div className="card-content">
            <div className="card-info">
              <span className="price">{randomBag.discount_price} €</span>
            </div>
            <h3 className="title">{randomBag.store_id}</h3>
            <p className="pickup-time">Tiempo de recogida {randomBag.pick_up_time}</p>
            <p className="see-more">{randomBag.description}</p>

            {/* Botones de actualizar y eliminar */}
            <div className="card-actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(randomBag.random_bag_id)}
              >
                Actualizar
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