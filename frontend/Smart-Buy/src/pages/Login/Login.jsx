import { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput";


const LoginPage = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [form , setForm] = useState({
        email: "",
        password: ""
    })

    const handleChanges = (e) =>{
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",form)
            console.log("Login response data:", response.data);
            localStorage.setItem("token", response.data.token)
            if(response.data.user && response.data.user.id){
                localStorage.setItem("userId", response.data.user.id) // Store user ID in localStorage
            }
            toast.success("Login Successful!", {
                autoClose: 2000,
            });
            navigate(from, {replace: true})
        }catch(err){
            toast.error(err.response?.data?.message || "Login failed", {
                autoClose: 2000,
            });
           
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 w-full max-w-sm">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h1>
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChanges}
        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <PasswordInput
        type="password"
        name={"password"}
        placeholder={"Enter password"}
        value={form.password}
        onChange={handleChanges}
        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
      >
        Login
      </button>
    </form>
    <div className="flex items-center justify-center gap-1 mt-4 text-sm">
      <span>Don’t have an account?</span>
      <button
        onClick={() => navigate('/signup')}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        Register
      </button>
    </div>
  </div>
</div>

    )
}

export default LoginPage;
