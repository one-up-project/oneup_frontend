import React, { useState, useEffect } from "react";
import "./favorites.scss"; // ✅ Importa el SCSS

const Favorites = () => {
    const [favoriteStores, setFavoriteStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // Simulación de llamada a la API
                const response = await fetch("http://tu-api.com/favorites"); // Reemplázalo con tu API real
                if (!response.ok) throw new Error("Error en la API");

                const data = await response.json();
                if (data.length > 0) {
                    setFavoriteStores(data); // ✅ Usa los datos reales del backend
                } else {
                    setFavoriteStores([ // ✅ Carga ejemplos si no hay favoritos en el backend
                        { id: 1, name: "Tienda Ejemplo 1", logo: "/default-store.jpg" },
                        { id: 2, name: "Tienda Ejemplo 2", logo: "/default-store.jpg" },
                        { id: 3, name: "Tienda Ejemplo 3", logo: "/default-store.jpg" }
                    ]);
                }
            } catch (error) {
                console.error("Error al obtener tiendas favoritas:", error);
                // Si hay un error, carga tiendas de ejemplo
                setFavoriteStores([
                    { id: 1, name: "Tienda Ejemplo 1", logo: "/default-store.jpg" },
                    { id: 2, name: "Tienda Ejemplo 2", logo: "/default-store.jpg" },
                    { id: 3, name: "Tienda Ejemplo 3", logo: "/default-store.jpg" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="favorites-container">
            <h1>Mis Tiendas Favoritas</h1>

            {loading ? (
                <p>Cargando tiendas favoritas...</p>
            ) : favoriteStores.length > 0 ? (
                <div className="store-grid">
                    {favoriteStores.map((store) => (
                        <div key={store.id} className="store-card">
                            <img src={store.logo} alt={store.name} className="store-logo" />
                            <p>{store.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes tiendas favoritas aún.</p>
            )}
        </div>
    );
};

export default Favorites;
