import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./usermanagement.scss";

const UserManagement = () => {
  const userName = "Juan Pérez"; // Aquí debería ir el nombre del usuario dinámico

  return (
    <div className="user-profile">
      <div className="user-icon">
        <FaUserCircle />
      </div>
      <div className="user-name">{userName}</div>
    </div>
  );
};

export default UserManagement;
