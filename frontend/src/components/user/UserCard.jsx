import { useQuery } from '@apollo/client';
import { GET_RANDOM_BAGS } from '../../graphql/queries';
import "./usercard.scss"; // Asegúrate de crear este archivo CSS

const UserCard = () => {


  // Obtener los datos de random_bag
  const { loading, error, data } = useQuery(GET_RANDOM_BAGS, {
    fetchPolicy: "network-only",
  });

  // Función para manejar la compra
  const handleBuy = (randomBag) => {
    alert(`Comprar bolsa: ${randomBag.random_bag_id}`);
    // Aquí puedes agregar la lógica para manejar la compra
  };

  // Función para manejar añadir al carrito
  const handleAddToCart = (randomBag) => {
    alert(`Añadir al carrito: ${randomBag.random_bag_id}`);
    // Aquí puedes agregar la lógica para añadir al carrito
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>No hay ninguna bolsa creada</p>;
  if (!data || !data.randomBags) return <p>No hay datos disponibles</p>;

  return (
    <div className="randombag-container">
      {data.randomBags.length > 0 ? (
        data.randomBags.map((randomBag) => (
          <div className="card" key={randomBag.random_bag_id}>
            <div className="card-content">
              <h3 className="title">{randomBag.username}</h3>
              <div className="card-info">
                <span className="total-price">$ {randomBag.total_price}</span>
                <span className="disc-price">$ {randomBag.discount_price}</span>
              </div>
              <p className="pickup-time">Tiempo de recogida: {new Date(randomBag.pick_up_time).toLocaleString()}</p>
              <p className="description">{randomBag.description}</p>
              <div className="card-actions">
                <button className="buy-button" onClick={() => handleBuy(randomBag)}>
                  Comprar
                </button>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(randomBag)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay bolsas disponibles.</p>
      )}
    </div>
  );
};

export default UserCard;