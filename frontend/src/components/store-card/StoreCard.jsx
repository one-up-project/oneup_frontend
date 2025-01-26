import { Link } from "react-router-dom";
import "./storeCard.scss";

function StoreCard({ item }) {
  return (
    <div className="store-card">
      <div className="store-name">
        <Link to={`/stores/${item.id}`}>{item.storeName}</Link>
      </div>
      <div className="store-info">
        {/* esta informacion la obtenemos apartir
        de la consulta de los datos de solo lectura
        replicado de la bd de users */}
        <p>Descripcion: {item.description}</p>
        <div className="address">
          <img src="/address.png" alt="" />
          <p>Latitud: {item.lat}</p>
        </div>
        <div className="save-store">
          <img src="/save.png" alt="" />
          <p>Guardar</p>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
