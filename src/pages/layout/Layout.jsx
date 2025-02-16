import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import NavbarHome from "../../components/navbar/NavbarHome";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      {/* Condicional para mostrar el navbar correspondiente */}
      <div className="navbar">
        {location.pathname === "/" ? <Navbar /> : <NavbarHome />}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
