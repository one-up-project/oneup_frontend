import React from "react";
import "./reserved.scss";
import { GET_USER_ORDERS } from "../../../graphql/queries";

import { useQuery } from "@apollo/client";

const Reserved = () => {
  // Obtener los datos de random_bag
  const { loading, error, data } = useQuery(GET_USER_ORDERS, {
    fetchPolicy: "network-only",
  });

  return (
    <div className="layer">
      <h1>Aqui se listan tus productos reservados</h1>
      <table className="reserved-table">
        <thead>
          <tr>
            <th className="reserved-table-header">Id Orden</th>
            <th className="reserved-table-header">Nombre tienda</th>
            <th className="reserved-table-header">Descripcion</th>
            <th className="reserved-table-header">Precio dto</th>
            <th className="reserved-table-header">Precio total</th>
            <th className="reserved-table-header">Hora</th>
            <th className="reserved-table-header">Cancelar</th>
            <th className="reserved-table-header">Pagar</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row, you can map through your data here */}
          <tr>
            <td className="reserved-table-cell">12345</td>
            <td className="reserved-table-cell">Store A</td>
            <td className="reserved-table-cell">Product Description</td>
            <td className="reserved-table-cell">$10.00</td>
            <td className="reserved-table-cell">$50.00</td>
            <td className="reserved-table-cell">12:00 PM</td>
            <td className="reserved-table-cell">
              <button className="cancel-button">Cancelar</button>
            </td>
            <td className="reserved-table-cell">
              <button className="pay-button">Pagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reserved;
