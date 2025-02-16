import React, { useState, useEffect } from "react";
import "./homeuser.scss"; // ✅ Asegura la importación del SCSS

const HomeUser = () => {
    const [userName, setUserName] = useState("User One Up");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Simulación de llamada a un backend
                const response = await fetch("http://tu-api.com/products"); // Reemplázalo con tu API real
                if (!response.ok) throw new Error("Error en la API");

                const data = await response.json();
                if (data.length > 0) {
                    setProducts(data); // ✅ Usa los productos del backend si están disponibles
                } else {
                    setProducts([ // ✅ Carga ejemplos solo si no hay productos en el backend
                        { id: 1, name: "Producto Ejemplo 1", image: "/default-product.jpg" },
                        { id: 2, name: "Producto Ejemplo 2", image: "/default-product.jpg" },
                        { id: 3, name: "Producto Ejemplo 3", image: "/default-product.jpg" }
                    ]);
                }
            } catch (error) {
                console.error("Error al obtener productos:", error);
                // Si hay un error, carga productos de ejemplo
                setProducts([
                    { id: 1, name: "Producto Ejemplo 1", image: "/default-product.jpg" },
                    { id: 2, name: "Producto Ejemplo 2", image: "/default-product.jpg" },
                    { id: 3, name: "Producto Ejemplo 3", image: "/default-product.jpg" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            {/* ✅ Imagen de fondo */}
            <img src="/image_fx_16.jpg" alt="Fondo" className="background-image" />

            <h1>Hola, {userName}. ¿Qué quieres adquirir hoy?</h1>

            {/* ✅ Indicador de carga */}
            {loading ? (
                <p>Cargando productos...</p>
            ) : products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <p>{product.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay productos disponibles en este momento.</p>
            )}
        </div>
    );
};

export default HomeUser;
