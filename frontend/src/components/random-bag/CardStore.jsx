import { useQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_BAGS } from "../../graphql/queries";
import { DELETE_RANDOM_BAG, RESERVE_RANDOM_BAG } from "../../graphql/mutations";
import { Link } from "react-router-dom";
import "./cardstore.scss";
import { useState } from "react";

const CardStore = () => {
  //variable tipo usuario
  const [currentUser, setCurrentUser] = useState("person");

  // Obtener los datos de random_bag
  const { loading, error, data } = useQuery(GET_RANDOM_BAGS, {
    fetchPolicy: "network-only",
  });
  // Mutación para eliminar una random_bag
  const [deleteRandomBag] = useMutation(DELETE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }],
  });

  //reservar producto
  const [reserveRandomBag] = useMutation(RESERVE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }],
  });

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

  console.log("Datos recibidos en el frontend:", data);

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

  // Actualizar post
  const handleUpdate = (random_bag_id) => {
    console.log("Actualizar Random Bag con ID:", random_bag_id);
    // Aquí puedes redirigir a un formulario de edición o abrir un modal
  };

  const handleReserve = async (random_bag_id) => {
    localStorage.setItem("user", JSON.stringify({ id: 1 }));
    const userID = JSON.parse(localStorage.getItem("user")).id;

    if (userID) {
      console.log("User ID:", userID);
      await reserveRandomBag({ variables: { user_id: userID, random_bag_id } });
      alert("Reserva realizada, realiza tu pago lo mas pronto posible");
    } else {
      console.error("No se encontró el ID del usuario");
      alert("No se pudo realizar la reserva");
    }
  };

  return (
    <div className="card-container">
      {data.randomBags.map((randomBag) => (
        <div className="card" key={randomBag.random_bag_id}>
          <div className="card-content">
            <h3 className="title">{randomBag.store.store_name}</h3>

            <hr />

            <div className="card-info">
              <span className="total-price">$ {randomBag.total_price} </span>

              <span className="disc-price">$ {randomBag.discount_price} </span>
            </div>
            <div className="pickup-time">
              <p>Recoger antes de: {randomBag.pick_up_time}</p>
            </div>

            <div className="description">
              <p>
                {" "}
                Descripcion: <br /> {randomBag.description}
              </p>
            </div>

            <hr />
            {/* Botones de actualizar y eliminar */}
            {currentUser == "store" ? (
              <div className="card-actions">
                <button
                  className="update-button"
                  onClick={() => handleUpdate(randomBag.random_bag_id)}
                >
                  <Link
                    to={{
                      pathname: "/store/form",
                      state: { randomBag }, // Pasamos los datos de la random bag como estado
                    }}
                  >
                    <button className="update-button">Actualizar</button>
                  </Link>
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
      ))}
    </div>
  );
};

export default CardStore;
