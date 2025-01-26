import React from "react";
import "./home2.scss";
import CardSotre from "../../components/home/CardStore";
import NavbarHome from "../../components/navbar/NavbarHome";

const Home2 = () => {
    return ( 
        
        <div className="layer">
            <div>
                <NavbarHome />
            </div>
            
            <div className="cards">
                <CardSotre />
                <CardSotre />
            </div>

        </div>

    );
};

export default Home2;
