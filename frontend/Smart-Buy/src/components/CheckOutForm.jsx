import { useState, useContext, useEffect } from "react";
import { CartContext } from "./context/CartContext";
import { toast } from "react-toastify";
import axios from "axios";

const CheckOutForm = ({ placeOrder, selectedItems = [] }) => {
  const { cartItem } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phoneNo: "",
    paymentMethod: "COD",
  });

  const itemsToDisplay = selectedItems.length > 0
    ? cartItem.filter(item => selectedItems.includes(item._id))
    : cartItem;

  const calculatedTotal = itemsToDisplay.reduce(
    (acc, item) => acc + ((item.price || 0) * (item.quantity || 0)),
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Verifying payment with data:", response);

        const user = response.data;
        setFormData(prev => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          address: user.address?.address || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zip: user.address?.zip || "",
          country: user.address?.country || "",
          phoneNo: user.address?.phoneNo || "",
        }));
      } catch (error) {
        toast.error("Internal server error");
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemsToCheckout = selectedItems.length > 0
      ? cartItem.filter(item => selectedItems.includes(item._id))
      : cartItem;

    if (itemsToCheckout.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      shippingInfo: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        phoneNo: formData.phoneNo,
      },
      paymentMethod: formData.paymentMethod,
      cartItems: itemsToCheckout.map(item => ({
        productId: item._id || item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: calculatedTotal,
      userID: localStorage.getItem("userId"), // Added userID for backend order creation
    };

    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === "COD") {
        await placeOrder(orderData);
      } else {
        // Razorpay Online Payment
        const token = localStorage.getItem("token");

        const { data: razorpayOrder } = await axios.post(
          "http://localhost:3000/api/payment/razorpay",
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔑 Replace with your environment variable
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "E-Commerce",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            console.log("Razorpay payment response:", response);
            try {
              const verifyRes = await axios.post(
                "http://localhost:3000/api/payment/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              if (verifyRes.data.success) {
                await placeOrder({
                  ...orderData,
                  isPaid: true,
                  razorpay: {
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                  },
                  paidAt: new Date(),
                });
              } else {
                toast.error("Payment verification failed");
              }
            } catch (err) {
              console.error("Verification error:", err);
              toast.error("Verification failed");
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phoneNo,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="font-bold text-2xl text-center mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Products to Purchase:</h3>
        <ul className="list-disc list-inside">
          {itemsToDisplay.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity} - ₹{item.price}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Form fields */}
        {["name", "email", "address", "city", "state", "zip", "country", "phoneNo"].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
        ))}

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="CreditCard">Credit Card</option>
          <option value="DebitCard">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="NetBanking">Net Banking</option>
          <option value="UPI">UPI</option>
          <option value="Wallet">Wallet</option>
          <option value="EMI">EMI</option>
        </select>

        <h2 className="font-semibold text-lg mt-4">Total: ₹{calculatedTotal}</h2>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
