  import { useState, useContext, useEffect } from "react";
  import { CartContext } from "./context/CartContext";
  import { toast } from "react-toastify";
  import axios from "axios";

  const CheckOutForm = ({ placeOrder, selectedItems = [] }) => {
    const { cartItem, totalAmount } = useContext(CartContext);
    console.log(placeOrder)
    console.log(selectedItems);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phoneNo:"",
      paymentMethod: "COD",
    });

    useEffect(()=> {
      const fetchUserProfile = async()=> {
          const userId = localStorage.getItem("userId")
          console.log(userId);
          const token = localStorage.getItem("token")
          if(!token) return;

          try{
              const response = await axios.get(`http://localhost:3000/api/users/profile/${userId}`,{
                  headers:{
                      Authorization:`Bearer ${token}`
                  },
              });
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
          } catch(error){
              toast.error("Internal servel error");
              console.log(error)
          }
      }
      fetchUserProfile();
    },[])

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    console.log(formData)
    const handleSubmit = async (e) => {
      e.preventDefault();

      const itemsToCheckout = selectedItems.length > 0 ? cartItem.filter(item=>selectedItems.includes(item._id)): cartItem;

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
          phoneNo:formData.phoneNo
        },
        paymentMethod: formData.paymentMethod,
        cartItems: itemsToCheckout.map(item => ({
          productId: item._id || item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: calculatedTotal,
      };
    
      setIsSubmitting(true);
      try {
        await placeOrder(orderData); // ✅ Now orderData is declared before this
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order");
      } finally {
        setIsSubmitting(false);
      }
    };
    
    // Merge selectedItems with cartItem to ensure price and quantity are present
    const itemsToDisplay = selectedItems.length > 0
  ? cartItem.filter(item => selectedItems.includes(item._id))
  : cartItem;

    const calculatedTotal = itemsToDisplay.reduce((acc,item)=>acc + ((item.price || 0) * (item.quantity || 0)),0);
    return (
      <div className="container mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="font-bold text-2xl text-center mb-4">CheckOut</h2>

        {/* Product Details */}
        <div className="mb-6">
          <h3 className="font-semibold text-xl mb-2">Products to Purchase:</h3>
          <ul className="list-disc list-inside">
            {itemsToDisplay.map((item, index) => (
              <li key={index} className="mb-1">
                {item.name || "Product"} - Quantity: {item.quantity || 1} - Price: ₹{item.price || 0}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Personal Details */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          
          {/* Shipping Details */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip"
            value={formData.zip}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="outline-none border-2 text-gray-400 rounded-md py-2 px-4"
          />
          
          {/* Payment Method */}
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

          {/* Order Summary */}
          <h2 className="font-semibold text-lg mt-4">Total: ₹{calculatedTotal}</h2>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    );
  };

  export default CheckOutForm;
