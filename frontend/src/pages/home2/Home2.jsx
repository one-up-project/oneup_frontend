import React from "react";
import "./home2.scss";
import CardSotre from "../../components/home/CardStore";
import { Link } from "react-router-dom";

const Home2 = () => {

    return (
        <div className="layer">
            <h1>Lista de publicaciones</h1>
            <Link to="/store/form">
                <button className="add-store-btn">Agregar bolsa sorpresa</button>
            </Link>
            <div className="cards">
                <CardSotre />
            </div>

        </div>
    );
};

export default Home2;
