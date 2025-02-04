import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
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
        <a href="logo"> Iniciar sesion</a>
        <span>Registrate como:</span>
        <Link className="register-customer" to="/user/home">
          Cliente
        </Link>
        <Link className="register-store" to="/store/home">
          Tienda
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
