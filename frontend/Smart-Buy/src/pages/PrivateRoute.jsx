import { useEffect, useState } from "react";
import { Navigate ,useLocation} from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // auth status
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setTimeout(() => {
        setLoading(false);
      }, 1000); // Simulate checking delay
    

     // after checking, stop loading
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("Please login to access Profile!", {
        autoClose: 2000,
      });
    return <Navigate to="/login" replace state={{from : location}} />;
  }

  return children;
};

export default PrivateRoute;
