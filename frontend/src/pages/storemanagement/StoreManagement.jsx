import "./storemanagement.scss";

const StoreManagement = () => {
  return (
    <div className="store-management">
      <h1>Bienvenido a Store Management</h1>
      <p>Administra tu tienda, publicaciones y pagos.</p>

      <div className="store-links">
        <a href="/storemanagement/profile">Editar Perfil</a>
        <a href="/storemanagement/history">Historial</a>
      </div>
    </div>
  );
};

export default StoreManagement;
