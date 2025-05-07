import React from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
      const response = await axios.get('http://localhost:3000/api/products/all-products');
      setProducts(response.data.products);
    } catch(err){
      console.log(err);
      toast.error("failed to load products")
    }
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;