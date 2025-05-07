import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (event) => {
    event.preventDefault();
    toast.success("Succefully add to Cart",{
      autoClose : 2000
    })
    addToCart(product);
  };
  return (
    <div className="border rounded  aspect-w-3 aspect-h-4 overflow-hidden">
      <Link to={`/product/${product._id}`} className=" ">
        <div className="aspect-w-3 aspect-h-4 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <p className="text-black font-semibold text-2xl">${product.price}</p>
        </div>
      </Link>
      <div className="p-4">
        <button
          className="bg-yellow-300 hover:bg-yellow-400 rounded-full font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 "
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
