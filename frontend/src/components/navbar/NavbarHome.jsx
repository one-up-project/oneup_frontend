import React from "react";
import { HomeIcon, SearchIcon, HeartIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./navbarhome.scss";

const NavbarHome = () => {
  return (
    <div className="top-bar">
      
      <Link to="/user/home">
      <button className="top-bar-button">
        <HomeIcon className="icon" />
        <span className="label">Inicio</span>
      </button>
      </Link>
      <Link to="user/search">
      <button className="top-bar-button">
        <SearchIcon className="icon" />
        <span className="label">Buscar</span>
      </button>
      </Link>
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
