import React, { createContext, useState,useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const getCartItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cart Fetch Success:', response.data);
  
      const updatedProducts = response.data.cartItems.map((item) => {
        if (!item.productId) {
          console.warn('Cart item without product:', item);
          return null;  // skip or handle accordingly
        } return{

          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          imageUrl: item.productId.imageUrl,
          quantity: item.quantity,
          description: item.productId.description,
          category: item.productId.category,
        }
      }).filter(item => item !== null);
      setCartItem(updatedProducts);
    } catch (err) {
      console.error('Cart Fetch Error:', err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch cart items");
    }
  },[]);
  

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart/add-to-cart",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCartItems();
      toast.success("Item added to cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add item");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/api/cart/remove-to-cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCartItems();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove item");
    }
  };

 const totalAmount = cartItem.reduce((acc,item)=> acc + item.price * item.quantity,0)
//  const totalAmount = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);


  return (
    <CartContext.Provider value={{ cartItem, getCartItems, addToCart, removeFromCart,totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
