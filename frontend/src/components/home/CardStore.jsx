import React from "react";
import "./cardstore.scss";

const CardSotre = () => {
  return (
    <div className="card">
      <div className="card-image">
        <img
          src= "/food-ppal-page.jpg"
          alt="Comida saludable"
        />
      </div>
      <div className="card-content">
        <div className="card-info">
          <span className="rating">⭐ 4.3</span>
          <span className="distance">542 m</span>
          <span className="price">4,99 €</span>
        </div>
        <h3 className="title">Hoùr Healthy Food</h3>
        <p className="pickup-time">Pick up time 15:10 - 17:00</p>
        <p className="see-more">See more...</p>
      </div>
    </div>
  );
};

export default CardSotre;
