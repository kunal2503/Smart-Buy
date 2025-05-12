import React, { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
import { Link } from "react-router-dom";
import { BsShopWindow } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cartItem } = useContext(CartContext);

  // Ensure cartItem is an array and calculate totalQuantity
  const totalItems = Array.isArray(cartItem)
    ? cartItem.reduce((sum, item) => sum + (item?.quantity || 0), 0)
    : 0;
  const totalQuantity = totalItems > 0 ? totalItems : 0;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-950 shadow-md py-4 px-6">
      <div>
        <Link to="/" className="flex items-center gap-1">
          <BsShopWindow className="size-6 text-white" />
          <span className="font-medium text-white">SmartBuy</span>
        </Link>
      </div>
      <div>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search Items"
          className="p-2 rounded text-white outline-none bg-gray-900 w-full"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex justify-center items-center">
          <Link to="/product" className="flex gap-1 text-white">
            <AiFillProduct className="size-6 text-white" />
            <span className="font-medium text-white">Products</span>
          </Link>
        </div>
        <div>
          { token ?(
            <Link to="/cart" className="flex gap-1 text-white">
            {totalQuantity > 0 && (
              <motion.span
              key={totalQuantity}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="badge text-amber-600 absolute top-1 right-60 font-bold"
              >
                {totalQuantity}
              </motion.span>
            )}
            <FaShoppingCart className="size-6 text-white" />
            <span className="font-medium text-white"> Cart</span>
          </Link>) :(
             <Link to="/cart" className="flex gap-1 text-white">
             {totalQuantity > 0 && (
               <motion.span
               key={totalQuantity}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               className="badge text-amber-600 absolute top-1 right-33 font-bold"
               >
                 {totalQuantity}
               </motion.span>
             )}
             <FaShoppingCart className="size-6 text-white" />
             <span className="font-medium text-white"> Cart</span>
           </Link>
          )
          }
        </div>

        {token ? (
          <>
            <div>
              <Link to="/profile" className="flex gap-1 text-white">
                <FaUserAlt className="size-6 text-white" />
                <span className="font-medium text-white">Profile</span>
              </Link>
            </div>
            <div>
              <Link to="/login" className="flex gap-1 text-white">
                <button onClick={handleLogout} className="flex gap-1 text-white">
                  <span className="font-medium text-white">Logout</span>
                </button>
              </Link>
            </div>
          </>
        ) : (
          <Link to={"/login"} className="flex gap-1 text-white">
            <span className="font-medium text-white">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
