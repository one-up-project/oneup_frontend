import "./storenavbar.scss";
import { useNavigate } from "react-router-dom";

function StoreNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left">
        <a className="logo" href="/storemanagement">
          <img src="/logo3.png" alt="OneUp Logo" />
          <span>OneUp Store</span>
        </a>
        <a href="/storemanagement/profile">Profile</a>
        <a href="/storemanagement/history">History</a>
      </div>
      <div className="right">
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default StoreNavbar;
