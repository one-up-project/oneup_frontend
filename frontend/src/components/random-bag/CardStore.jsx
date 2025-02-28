import { useQuery, useMutation } from '@apollo/client';
import { GET_RANDOM_BAGS } from '../../graphql/queries';
import { DELETE_RANDOM_BAG } from '../../graphql/mutations';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./cardstore.scss";

const CardStore = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_RANDOM_BAGS, {
    fetchPolicy: "network-only",
  });

  const [deleteRandomBag] = useMutation(DELETE_RANDOM_BAG, {
    refetchQueries: [{ query: GET_RANDOM_BAGS }],
  });

  const handleDelete = async (random_bag_id) => {
    try {
      await deleteRandomBag({ variables: { random_bag_id } });
      alert('Random Bag eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar la Random Bag:', err);
      alert('Hubo un error al eliminar la Random Bag');
    }
  };

  const handleUpdate = (randomBag) => {
    localStorage.setItem("randomBag", JSON.stringify(randomBag));
    navigate("/store/update_form");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>No hay ninguna bolsa creada</p>;
  if (!data || !data.randomBags) return <p>No hay datos disponibles</p>;

  const filteredBags = data.randomBags.filter((randomBag) => randomBag.store_id.toString() === user.id.toString());

  return (
    <div className="randombag-container">
      {filteredBags.length > 0 ? (
        filteredBags.map((randomBag) => (
          <div className="card" key={randomBag.random_bag_id}>
            <div className="card-content">
              <h3 className="title">{randomBag.username}</h3>
              <div className="card-info">
                <span className="price">{randomBag.discount_price} €</span>
              </div>
              <p className="pickup-time">Tiempo de recogida: {new Date(randomBag.pick_up_time).toLocaleString()}</p>
              <p className="description">{randomBag.description}</p>
              <div className="card-actions">
                <button className="update-button" onClick={() => handleUpdate(randomBag)}>
                  Actualizar
                </button>
                <button className="delete-button" onClick={() => handleDelete(randomBag.random_bag_id)}>
                  Eliminar
                </button>
              </div>
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