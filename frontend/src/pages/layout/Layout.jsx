import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import NavbarHome from "../../components/navbar/NavbarHome";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // Determinar si el Navbar debe mostrarse
  const showNavbar = !["/login", "/register"].includes(location.pathname);

  return (
    <div className="layout">
      {/* Mostrar el Navbar solo si no estamos en /login o /register */}
      {showNavbar && (
        <div className="navbar">
          {location.pathname === "/" ? <Navbar /> : <NavbarHome />}
        </div>
      )}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;