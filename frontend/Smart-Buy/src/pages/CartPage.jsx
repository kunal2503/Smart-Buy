import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/context/CartContext";
import CartEmptyImage from "../assets/add-6622547_1280.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState([]); // ✅ Should be an array
  const navigate = useNavigate();
  const { cartItem, removeFromCart, addToCart, getCartItems } = useContext(CartContext);

  useEffect(() => {
    getCartItems();
  }, []);

  const handleCheckBoxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };
  console.log(selectedItems);

  const totalPrice = cartItem
    ?.filter((item) => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0);

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item.");
      return;
    }
    navigate("/checkout", { state: { selectedItems } });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-md flex-grow mt-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

        {cartItem.length === 0 ? (
          <img src={CartEmptyImage} alt="Empty Cart" className="h-full w-full" />
        ) : (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {cartItem.map((item) => (
              <div
                className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
                key={item._id}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckBoxChange(item._id)}
                    className="form-checkbox h-5 w-5 text-yellow-500"
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">
                      ${item.price || 0} x {item.quantity || 0}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    <FaPlus />
                  </button>
                  <span className="text-black m-2 font-semibold text-2xl">
                    {item.quantity || 0}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItem.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Selected Items:</span>
              <span>{selectedItems.length}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Total Price:</span>
              <span className="font-semibold">${(totalPrice || 0).toFixed(2)}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md"
            >
              Proceed to Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
