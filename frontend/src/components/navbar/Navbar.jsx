import "./navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left">
        <a className="logo" href="/">
          <img src="/logo3.png" />
          <span>OneUp</span>
        </a>
        <a href="/">Sobre nosotros</a>
        <a href="/">Contacto</a>
      </div>
      <div className="right">
        <a href="">Iniciar sesion</a>
        <span>Registrate como:</span>
        <a className="register-customer" href="">
          Cliente
        </a>
        <a className="register-store" href="">
          Tienda
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
