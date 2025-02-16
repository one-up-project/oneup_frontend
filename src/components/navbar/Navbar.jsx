import { Link } from "react-router-dom";
import "./navbar.scss";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="left">
        <a className="logo" href="/">
          <img src="/logo3.png" alt="Logo de la compania" />
          <span>OneUp</span>
        </a>
        <a href="/">Sobre nosotros</a>
        <a href="/">Contacto</a>
      </div>
      <div className="right">
        {isAuthenticated ? (
          <>
            <label>Hola {user.username}</label>
            <label className=".navbar_label">
              <Link to="/" onClick={() => logout()}>
                Cerrar sesión
              </Link>
            </label>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registro</Link>
            <span>Registrate como:</span>
            <Link className="register-customer" to="/user/home">
              Cliente
            </Link>
            <Link className="register-store" to="/store/home">
              Tienda
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
