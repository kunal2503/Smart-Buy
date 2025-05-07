import React, { useContext, useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { CartContext } from "../components/context/CartContext";
import Footer from "../components/Footer";
import axios from "axios";

const ProductDetailsPage = () => {
  const {id} = useParams(); // Assuming you're using react-router-dom for routing
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProducts(response.data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [id]);

  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-100 py-8 flex-grow">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          <h4 className="text-xl text-gray-800 font-semibold">
            Product Not Found!
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="py-8 flex-grow">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={products.id}>
              <div className="flex justify-center">
                <img
                  src={products.imageUrl}
                  alt={products.name}
                  className="rounded-lg shadow-md max-w-full h-auto"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {products.name}
                </h2>
                <p className="text-gray-600 mb-4">{products.description}</p>
                <p className="text-xl font-semibold mb-4 text-indigo-600">
                  ${products.price}
                </p>
                <button
                  onClick={() => addToCart(products)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Add To Cart
                </button>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
