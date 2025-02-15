import React, { useEffect, useState } from "react";
import "./storehistory.scss";

const StoreHistory = () => {
  const [history, setHistory] = useState({
    publicaciones: [],
    pagos: [],
  });

  useEffect(() => {
    fetch("/api/store/history") // Ajusta la ruta según tu backend
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setHistory({
            publicaciones: data.publicaciones || [],
            pagos: data.pagos || [],
          });
        }
      })
      .catch((error) => console.error("Error al cargar el historial:", error));
  }, []);

  return (
    <div className="store-history">
      <h2>Historial de Tienda</h2>

      <div className="history-section">
        <h3>Publicaciones</h3>
        <ul>
          {history.publicaciones.length > 0 ? (
            history.publicaciones.map((pub, index) => (
              <li key={index}>{pub.titulo} - {pub.estado}</li>
            ))
          ) : (
            <li>No hay publicaciones recientes</li>
          )}
        </ul>
      </div>

      <div className="history-section">
        <h3>Pagos</h3>
        <ul>
          {history.pagos.length > 0 ? (
            history.pagos.map((pago, index) => (
              <li key={index}>{pago.descripcion} - ${pago.monto}</li>
            ))
          ) : (
            <li>No hay pagos registrados</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StoreHistory;
