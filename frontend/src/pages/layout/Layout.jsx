import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      {/* reutilizacion de navbar  */}
      <div className="navbar">
        <Navbar />
      </div>
      {/* componente outlet "comodin" */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
