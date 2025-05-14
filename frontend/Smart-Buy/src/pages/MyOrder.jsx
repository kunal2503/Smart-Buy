import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Unauthorized. Please log in.");
      navigate("/login");
      return;
    }

    getOrders();
  }, [navigate]);
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Unauthorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
  {orders.map((order) =>
    order?.cartItems?.map((item) => (
      <tr key={item?._id || Math.random()} className="hover:bg-gray-100">
        <td className="border px-4 py-2">
          {item?.productId ? (
            <Link
              to={`/product/${item?.productId?._id}`}
              className="text-blue-500 hover:underline"
            >
              {item?.productId?.name || "Unnamed Product"}
            </Link>
          ) : (
            <span className="text-gray-400">Product Not Found</span>
          )}
        </td>
        <td className="border px-4 py-2">{item?.quantity ?? "N/A"}</td>
        <td className="border px-4 py-2">{order?._id ?? "N/A"}</td>
        <td className="border px-4 py-2">
          ₹{item?.price && item?.quantity ? item.price * item.quantity : "N/A"}
        </td>
        <td className="border px-4 py-2">{item?.status ?? "Pending"}</td>
        <td className="border px-4 py-2">
          <Link
            to={`/order-Details`}
            state={order}
            className="text-blue-500 hover:underline"
          >
            See in Details
          </Link>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      )}
    </div>
  );
};

export default MyOrder;
