import React from "react";
import { HomeIcon, SearchIcon, HeartIcon, UserIcon } from "lucide-react";
import "./navbarhome.scss";

const NavbarHome = () => {
  return (
    <div className="top-bar">
      <button className="top-bar-button">
        <HomeIcon className="icon" />
        <span className="label">Inicio</span>
      </button>
      <button className="top-bar-button">
        <SearchIcon className="icon" />
        <span className="label">Buscar</span>
      </button>
      <button className="top-bar-button">
        <HeartIcon className="icon" />
        <span className="label">Favoritos</span>
      </button>
      <button className="top-bar-button">
        <UserIcon className="icon" />
        <span className="label">Perfil</span>
      </button>
    </div>
  );
};

export default NavbarHome;
