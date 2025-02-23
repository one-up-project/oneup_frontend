import React from "react";
import "./pending.scss";
import { GET_PENDING_ORDERS } from "../../../graphql/queries";

import { useQuery } from "@apollo/client";

const Pending = () => {
  //obtener el id del usuario
  const id = JSON.parse(localStorage.getItem("store")).id;

  // Obtener los datos de las ordenes de la tienda
  const { loading, error, data } = useQuery(GET_PENDING_ORDERS, {
    variables: { storeId: id },
    fetchPolicy: "network-only",
  });

  if (!data || !data.getOrdersByStore) {
    console.log("No hay datos disponibles,", data);
    return (
      <div className="layer">
        <h2>No hay datos disponibles</h2>
      </div>
    );
  } else {
    console.log("ordenes encontradas,", data);
  }
  return (
    <div className="layer">
      <h1>Aqui se listan las ordenes</h1>
      <table className="pending-table">
        <thead>
          <tr>
            <th className="pending-table-header">Id Orden</th>
            <th className="pending-table-header">Id Usuario</th>
            <th className="pending-table-header">Descripcion</th>
            <th className="pending-table-header">Precio</th>
            <th className="pending-table-header">Precio dto</th>
            <th className="pending-table-header">Hora</th>
            <th className="pending-table-header">Estado</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row, you can map through your data here */}
          {data &&
            data.getOrdersByStore.map((order) => (
              <tr key={order.order_id}>
                <td className="pending-table-cell">{order.order_id}</td>
                <td className="pending-table-cell">{order.user_id}</td>
                <td className="pending-table-cell">
                  {order.randomBag.description}
                </td>
                <td className="total-price">{order.randomBag.total_price}</td>
                <td className="discount-price">
                  {order.randomBag.discount_price}
                </td>
                <td className="pending-table-cell">
                  {order.randomBag.pick_up_time}
                </td>
                <td className="status">{order.current_status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pending;
