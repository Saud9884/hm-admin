import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  });
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paymnet Status</th>
            <th>Recipient</th>
            <th>Produts</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-800" : "text-red-800"}>
                  {order.paid ? "Success" : "Failed"}
                </td>
                <td>
                  {order.name} {order.email} {order.phoneNumber}{" "}
                  {order.streetAddress} {order.city} {order.postalCode}{" "}
                  {order.country}{" "}
                </td>
                <td>
                    {order.line_items.map(l => (
                        <>
                        {l.price_data?.product_data.name} x {l.quantity}<br />
                        
                        </>
                    ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
