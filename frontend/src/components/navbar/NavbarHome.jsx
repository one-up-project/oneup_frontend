import React from "react";
import {
  HomeIcon,
  SearchIcon,
  PackageCheck,
  UserIcon,
  LogOutIcon,
  ShoppingBasket,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./navbarhome.scss";

const NavbarHome = () => {
  const location = useLocation();

  // Determina si la ruta actual
  const basePath = location.pathname.startsWith("/store") ? "/store" : "/user";
  const isStore = location.pathname.startsWith("/store");

  return (
    <div className="top-bar">
      <a className="logo" href="/">
        <img src="/logo3.png" alt="Logo de la compania" />
      </a>
      <Link to={`${basePath}/home`}>
        <button className="top-bar-button">
          <HomeIcon className="icon" />
          <span className="label">Inicio</span>
        </button>
      </Link>
      <Link to={`${basePath}/search`}>
        <button className="top-bar-button">
          <SearchIcon className="icon" />
          <span className="label">Buscar</span>
        </button>
      </Link>
      {isStore && (
        <Link to={`${basePath}/pending`}>
          <button className="top-bar-button">
            <PackageCheck className="icon" />
            <span className="label">Pendientes</span>
          </button>
        </Link>
      )}
      {!isStore && (
        <Link to={`${basePath}/reserved`}>
          <button className="top-bar-button">
            <ShoppingBasket className="icon" />
            <span className="label">Reservados</span>
          </button>
        </Link>
      )}
      <Link to={`${basePath}/profile`}>
        <button className="top-bar-button">
          <UserIcon className="icon" />
          <span className="label">Perfil</span>
        </button>
      </Link>

      <Link to="/">
        <button className="top-bar-button logout-button">
          <LogOutIcon className="icon logout-icon" />
          <span className="label">Salir</span>
        </button>
      </Link>
    </div>
  );
};

export default NavbarHome;
