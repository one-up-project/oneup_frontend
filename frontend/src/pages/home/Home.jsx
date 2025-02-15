import React from "react";
import "./home.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faLeaf, faMapMarkerAlt, faCoffee } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
  return (
    <div className="home-page">
      <div className="banner1">
        <h2>
          One Up, la plataforma que te ayudara a formar parte del cambio y a
          reducir el desperdicio de alimentos
        </h2>
        <p className="subtext">
          Unete a esta gran comunidad en donde podras encontrar excelentes
          productos a un precio excepcional y aportar tu granito de arena en la
          lucha contra el desperdicio
        </p>
      </div>
      <div className="question">
        <p className="text">¿Por que usar OneUP?</p>
      </div>

      <section className="benefits">
      <div className="benefit-card">
        <FontAwesomeIcon icon={faUtensils} className="benefit-icon" />
        <div className="benefit-title">Disfruta de buena comida</div>
        <div className="benefit-description">A la mitad del precio o menos.</div>
      </div>
      <div className="benefit-card">
        <FontAwesomeIcon icon={faLeaf} className="benefit-icon" />
        <div className="benefit-title">Ayuda al medio ambiente</div>
        <div className="benefit-description">Reduciendo el desperdicio de alimentos.</div>
      </div>
      <div className="benefit-card">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="benefit-icon" />
        <div className="benefit-title">Rescata comida cerca de ti</div>
        <div className="benefit-description">Encuentra ofertas en tu localidad.</div>
      </div>
      <div className="benefit-card">
        <FontAwesomeIcon icon={faCoffee} className="benefit-icon" />
        <div className="benefit-title">Prueba algo nuevo</div>
        <div className="benefit-description">De cafeterías, panaderías o restaurantes.</div>
      </div>
    </section>

      <div className="how-to">
        <p>¿Como funciona?</p>
      </div>
      <div className="steps">
        <div className="step1">
          <h3>Paso 1</h3>
          <p>
            Descubre paquetes sorpresa disponibles en las tiendas y restaurantes
            cerca a ti
          </p>
        </div>
        <div className="step2">
          <h3>Paso 2</h3>
          <p>Confirma tu eleccion, reserva tu comida, y paga el producto</p>
        </div>
        <div className="step3">
          <h3>Paso 3</h3>
          <p>
            Acercate a la tienda dentro del tiempo especificado, muestra el
            codigo de la app y disfruta tu comida
          </p>
        </div>
        <div className="step4">
          <h3>Paso 4</h3>
          <p>Rescataste buena comida de ser desperdiciada!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
