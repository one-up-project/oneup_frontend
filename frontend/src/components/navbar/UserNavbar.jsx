import "./usernavbar.scss";
import { useNavigate } from "react-router-dom"; 

function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de cierre de sesión (borrar token, limpiar sesión, etc.)
    console.log("Cerrando sesión...");
    
    // Redirigir al home global
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left">
        <a className="logo" href="/usermanagement">
          <img src="/logo3.png" alt="OneUp Logo" />
          <span>OneUp</span>
        </a>
        <a href="/usermanagement/profile">Profile</a>
        <a href="/usermanagement/favorites">Favorites</a>
        <a href="/usermanagement/history">History</a>
      </div>
      <div className="right">
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default UserNavbar;
