import { Link } from "react-router-dom";
import "./storeCard.scss";

function StoreCard({ item }) {
  return (
    <div className="store-card">
      <div className="store-name">
        <Link to={`/stores/${item.id_store}`}>{item.store_name}</Link>
      </div>
      <div className="store-info">
        {/* esta informacion la obtenemos apartir
        de la consulta de los datos de solo lectura
        replicado de la bd de users */}
        <p>Descripcion: {item.description}</p>
        <div className="address">
          <img src="/address.png" alt="" />
          <p>
            Latitud: {item.location.lat}, Longitud: {item.location.lon}{" "}
          </p>
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
