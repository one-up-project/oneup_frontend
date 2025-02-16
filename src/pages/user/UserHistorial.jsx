import React, { useState, useEffect } from "react";
import "./userhistorial.scss"; // ✅ Importa el SCSS

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Simulación de llamada al backend
                const response = await fetch("http://tu-api.com/history"); // 🔥 Reemplázalo con tu API real
                if (!response.ok) throw new Error("Error en la API");

                const data = await response.json();
                if (data.length > 0) {
                    setHistory(data); // ✅ Usa los datos reales del backend
                } else {
                    setHistory([ // ✅ Si no hay datos, carga ejemplos
                        { id: 1, name: "Producto Comprado", price: 15000, image: "/default-product.jpg" },
                        { id: 2, name: "Producto Rescatado", price: 0, image: "/default-product.jpg" },
                        { id: 3, name: "Producto Comprado", price: 12000, image: "/default-product.jpg" },
                        { id: 4, name: "Producto Rescatado", price: 0, image: "/default-product.jpg" }
                    ]);
                }
            } catch (error) {
                console.error("Error al obtener historial:", error);
                // Si hay un error, carga ejemplos
                setHistory([
                    { id: 1, name: "Producto Comprado", price: 15000, image: "/default-product.jpg" },
                    { id: 2, name: "Producto Rescatado", price: 0, image: "/default-product.jpg" },
                    { id: 3, name: "Producto Comprado", price: 12000, image: "/default-product.jpg" },
                    { id: 4, name: "Producto Rescatado", price: 0, image: "/default-product.jpg" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="history-container">
            <h1>Mis Productos Rescatados</h1>

            {loading ? (
                <p>Cargando historial...</p>
            ) : history.length > 0 ? (
                <div className="history-grid">
                    {history.map((item) => (
                        <div key={item.id} className="history-card">
                            <img src={item.image} alt={item.name} className="history-image" />
                            <p>{item.name}</p>
                            <p className={item.price === 0 ? "free" : "price"}>
                                {item.price === 0 ? "Rescatado" : `$${item.price.toLocaleString()}`}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes productos en tu historial.</p>
            )}
        </div>
    );
};

export default History;
