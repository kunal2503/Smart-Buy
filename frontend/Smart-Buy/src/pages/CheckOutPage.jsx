import axios from "axios";
import CheckOutForm from "../components/CheckOutForm";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckOutPage = () => {
  const { state } = useLocation(); // ✅ Correctly destructured
  const navigate = useNavigate();

  const placeOrder = async (orderData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order.");
      return;
    }

    try {
      const response = await axios.post("/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return <CheckOutForm placeOrder={placeOrder} selectedItems={state?.selectedItems || []} />;
};

export default CheckOutPage;
