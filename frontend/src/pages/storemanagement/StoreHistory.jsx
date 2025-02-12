import "./storehistory.scss";

const StoreHistory = () => {
  return (
    <div className="store-history">
      <h2>Historial de Tienda</h2>

      <div className="history-section">
        <h3>Publicaciones</h3>
        <ul>
          <li>Publicación 1 - Vendida</li>
          <li>Publicación 2 - Activa</li>
          <li>Publicación 3 - En revisión</li>
        </ul>
      </div>

      <div className="history-section">
        <h3>Pagos</h3>
        <ul>
          <li>Pago recibido - $100</li>
          <li>Pago pendiente - $50</li>
        </ul>
      </div>
    </div>
  );
};

export default StoreHistory;
