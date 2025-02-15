import React, { useState, useEffect } from "react";
import "./userhistory.scss";

const UserHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/user/history") // Ajusta la ruta según tu backend
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setHistory(data);
        } else {
          setHistory([
            { id: 1, event: "Pedido #12345", date: "10/02/2025" },
            { id: 2, event: "Pago realizado", date: "08/02/2025" },
          ]); // Datos por defecto
        }
      })
      .catch((error) => {
        console.error("Error al obtener historial:", error);
        setHistory([
          { id: 1, event: "Pedido #12345", date: "10/02/2025" },
          { id: 2, event: "Pago realizado", date: "08/02/2025" },
        ]); // Datos por defecto en caso de error
      });
  }, []);

  return (
    <div className="history-container">
      <h2>Historial de Actividad</h2>
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <strong>{item.event}</strong> - <span>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
