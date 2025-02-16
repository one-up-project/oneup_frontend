import React from "react";
import { HomeIcon, SearchIcon, HeartIcon, UserIcon, LogOutIcon, HistoryIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./navbarhome.scss";

const NavbarHome = () => {
  const location = useLocation();
  
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
        <Link to={`${basePath}/favorites`}>
          <button className="top-bar-button">
            <HeartIcon className="icon" />
            <span className="label">Favoritos</span>
          </button>
        </Link>
      )}
      <Link to={`${basePath}/history`}>
        <button className="top-bar-button">
          <HistoryIcon className="icon" />
          <span className="label">Historial</span>
        </button>
      </Link>
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
