import { useQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_BAGS } from "../../graphql/queries";
import { DELETE_RANDOM_BAG, RESERVE_RANDOM_BAG } from "../../graphql/mutations";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./cardstore.scss";

const CardStore = () => {
  const navigate = useNavigate(); // Hook para redireccionar
  const location = useLocation(); // Hook para obtener la ruta actual
  const { user } = useAuth(); // Obtiene el usuario autenticado

  // Determina si la ruta actual es /store
  const isStore = location.pathname.startsWith("/store");

  // Obtener los datos de random_bag
  const { loading, error, data } = useQuery(GET_RANDOM_BAGS, {
    fetchPolicy: "network-only",
  });

  console.log("user", user.id);
  console.log("Datos recibidos en el frontend:", data);

  // Mutación para eliminar una random_bag
  const [deleteRandomBag] = useMutation(DELETE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }],
  });

  // Mutación para reservar una random_bag
  const [reserveRandomBag] = useMutation(RESERVE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }],
  });

  // Función para manejar la eliminación
  const handleDelete = async (random_bag_id) => {
    try {
      console.log("Intentando eliminar random_bag con ID:", random_bag_id);
      await deleteRandomBag({ variables: { random_bag_id } });
      alert("Random Bag eliminada exitosamente");
    } catch (err) {
      console.error("Error al eliminar la Random Bag:", err);
      alert("Hubo un error al eliminar la Random Bag");
    }
  };

  // Función para manejar la reserva
  const handleReserve = async (random_bag_id) => {
    try {
      console.log("Intentando reservar random_bag con ID:", random_bag_id);
      await reserveRandomBag({
        variables: { user_id: user.id, random_bag_id },
      });
      alert("Reserva realizada, realiza tu pago lo más pronto posible");
    } catch (err) {
      console.error("Error al reservar la Random Bag:", err);
      alert("Hubo un error al reservar la Random Bag");
    }
  };

  // Función para manejar la actualización
  const handleUpdate = (randomBag) => {
    // Redirige al formulario de actualización con los datos de la randomBag
    navigate("/store/update_form", { state: { randomBag } });
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

  // Filtrar las randomBags para mostrar solo las que coinciden con el store_id del usuario
  const filteredBags = data.randomBags.filter(
    (randomBag) => randomBag.store_id.toString() === user.id.toString()
  );

  console.log("Datos filtrados a renderizar:", filteredBags);

  return (
    <div className="card-container">
      {filteredBags.length > 0 ? (
        filteredBags.map((randomBag) => (
          <div className="card" key={randomBag.random_bag_id}>
            <div className="card-content">
              <h3 className="title">{randomBag.store.store_name}</h3>
              <hr />
              <div className="card-info">
                <span className="total-price">$ {randomBag.total_price}</span>
                <span className="disc-price">$ {randomBag.discount_price}</span>
              </div>
              <div className="pickup-time">
                <p>Recoger antes de: {randomBag.pick_up_time}</p>
              </div>
              <div className="description">
                <p>Descripción: <br /> {randomBag.description}</p>
              </div>
              <hr />
              {/* Botones de actualizar, eliminar o reservar */}
              {isStore ? (
                <div className="card-actions">
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(randomBag)}
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
              ) : (
                <div className="card-actions">
                  <button
                    className="reserve-button"
                    onClick={() => handleReserve(randomBag.random_bag_id)}
                  >
                    Reservar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No hay bolsas disponibles para tu tienda.</p>
      )}
    </div>
  );
};

export default CardStore;