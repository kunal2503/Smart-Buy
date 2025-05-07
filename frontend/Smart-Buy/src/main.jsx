import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primeicons/primeicons.css";
import "./index.css";
import CartProvider from "./components/context/CartContext.jsx";
import AuthProvider  from "./components/context/AuthContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
 
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
        </AuthProvider>
      </StrictMode>
    
);
