import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./reserved.scss";
import { GET_USER_ORDERS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useState } from "react";

const Reserved = () => {
  const [preferenceIds, setPreferenceIds] = useState({});
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

  //integracion mercado pago

  initMercadoPago(process.env.REACT_APP_PUBLIC_KEY, {
    locale: "es-CO",
  });

  const createPreference = async (title, price) => {
    console.log("datos pago:", title, price);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PAYMENT_MS}/payments-ms/create_preference`,
        {
          title: title,
          price: price,
          quantity: 1,
        }
      );
      const { id } = response.data;
      return id;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async (orderId, title, price) => {
    const id = await createPreference(title, price);
    setPreferenceIds((prev) => ({ ...prev, [orderId]: id }));
  };

  return (
    <div className="table-container">
      <div className="title">
        <h3>Aqui se listan tus productos reservados</h3>
      </div>
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
            <th className="reserved-table-header">Checkout</th>
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
                  <button
                    className="pay-button"
                    onClick={() =>
                      handlePayment(
                        order.order_id,
                        order.randomBag.description,
                        order.randomBag.discount_price
                      )
                    }
                  >
                    Pagar
                  </button>
                </td>
                <td>
                  {preferenceIds[order.order_id] && (
                    <div className="wallet">
                      <Wallet
                        initialization={{
                          preferenceId: preferenceIds[order.order_id],
                        }}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reserved;
