import React from "react";
import "./home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <div className="banner1">
        <h2>
          One Up, la plataforma que te ayudara a formar parte del cambio y a
          reducir el desperdicio de alimentos
        </h2>
        <p>
          Unete a esta gran comunidad en donde podras encontrar excelentes
          productos a un precio excepcional y aportar tu granito de arena en la
          lucha contra el desperdicio
        </p>
      </div>
      <div className="question">
        <p>¿Por que usar OneUP?</p>
      </div>
      <div className="container">
        <div className="img-container">
          <img src="/food-ppal-page.jpg" alt="" />
        </div>
        <div className="text-container">
          <h3> Disfruta de buena comida a la mitad del precio o menos</h3>{" "}
          <br />
          <h3>
            Ayuda al medio ambiente reduciendo el desperdicio de alimentos
          </h3>{" "}
          <br />
          <h3>Rescata comida cerca a ti</h3> <br />
          <h3>
            Prueba algo nuevo de cafeterias, panaderias o restaurantes
          </h3>{" "}
          <br />
        </div>
      </div>
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
