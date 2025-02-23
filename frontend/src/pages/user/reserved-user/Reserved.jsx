import React from "react";
import "./reserved.scss";
import { GET_USER_ORDERS } from "../../../graphql/queries";

import { useQuery } from "@apollo/client";

const Reserved = () => {
  //obtener el id del usuario
  const id = JSON.parse(localStorage.getItem("user")).id;

  // Obtener los datos de las ordenes del usuario
  const { loading, error, data } = useQuery(GET_USER_ORDERS, {
    variables: { userId: id },
    fetchPolicy: "network-only",
  });

  if (!data || !data.getOrdersByUser) {
    console.log("No hay datos disponibles,", data);
    return <p>No hay datos disponibles</p>;
  } else {
    console.log("ordenes encontradas,", data);
  }
  return (
    <div className="layer">
      <h1>Aqui se listan tus productos reservados</h1>
      <table className="reserved-table">
        <thead>
          <tr>
            <th className="reserved-table-header">Id Orden</th>
            <th className="reserved-table-header">Nombre tienda</th>
            <th className="reserved-table-header">Descripcion</th>
            <th className="reserved-table-header">Precio</th>
            <th className="reserved-table-header">Precio dto</th>
            <th className="reserved-table-header">Hora</th>
            <th className="reserved-table-header">Estado</th>
            <th className="reserved-table-header">Cancelar</th>
            <th className="reserved-table-header">Pagar</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row, you can map through your data here */}
          {data &&
            data.getOrdersByUser.map((order) => (
              <tr key={order.order_id}>
                <td className="reserved-table-cell">{order.order_id}</td>
                <td className="reserved-table-cell">
                  {order.randomBag.store.store_name}
                </td>
                <td className="reserved-table-cell">
                  {order.randomBag.description}
                </td>
                <td className="total-price">{order.randomBag.total_price}</td>
                <td className="discount-price">
                  {order.randomBag.discount_price}
                </td>
                <td className="reserved-table-cell">
                  {order.randomBag.pick_up_time}
                </td>
                <td className="status">{order.current_status}</td>
                <td className="reserved-table-cell">
                  <button className="cancel-button">Cancelar</button>
                </td>
                <td className="reserved-table-cell">
                  <button className="pay-button">Pagar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reserved;
