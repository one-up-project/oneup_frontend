import React from "react";
import NavbarHome from "../../components/navbar/NavbarHome";
import Form from "../../components/store/Form";

const Store = () => {
    return ( 
        
        <div className="layer">
            <div>
                <NavbarHome />
            </div>
            <div>
                <Form />
            </div>

        </div>

    );
};

export default Store;