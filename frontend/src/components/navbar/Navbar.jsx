import "./navbar.scss";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom"; // npm install react-router-dom

function Navbar() {
  const { isAuthenticated, user, logout} = useAuth();
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
{console.log(isAuthenticated)}
        {isAuthenticated ? (
          <>
            <label>
              Hola {user.username}
            </label>
            {/* */}
            <label className=".navbar_label">
              <Link to="/" onClick={() => logout()}>
                Cerrar sesión
              </Link>
            </label>
          </>
        ) : (
          <>
              <Link to="/login">Inicio sesión</Link>
              <Link to="/register">Registro</Link>
          </>
        )}


{/* 
      <a href="/login">Iniciar sesion</a>
      <a href="/register">Registrate como:</a>
*/}



        <Link className="register-customer" to="/">
          Cliente
        </Link>
        <Link className="register-store" to="/">
          Tienda
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
