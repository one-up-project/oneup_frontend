import React from "react";
import { HomeIcon, SearchIcon, HeartIcon, UserIcon, LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./navbarhome.scss";

const NavbarHome = () => {
  const location = useLocation();
  
  // Determina si la ruta actual 
  const basePath = location.pathname.startsWith("/store") ? "/store" : "/user";
  const isStore = location.pathname.startsWith("/store"); 

  return (
    <div className="top-bar">
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
      {!isStore && (
        <button className="top-bar-button">
          <HeartIcon className="icon" />
          <span className="label">Favoritos</span>
        </button>
      )}
      <Link to={`${basePath}/updateUser`}>
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
