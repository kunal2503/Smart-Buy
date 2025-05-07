import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";
    const navigate = useNavigate();

    const [form , setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChanges = (e) =>{
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/api/auth/signup",form)

            const {token , user } = response.data;

            localStorage.setItem("token",token);

            toast.success("Account Created",{
                autoClose:2000
            })

            navigate(from, {replace: true})
        }
        catch(err){
            toast.success(err.response.data.message,{
                autoClose:2000
            })
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChanges}
          className="border border-gray-300 outline-none rounded-md p-3 focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChanges}
          className="border border-gray-300 outline-none rounded-md p-3 focus:border-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChanges}
          className="border border-gray-300 outline-none rounded-md p-3 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
      </p>
    </div>
  </div>
  
  )
}

export default Signup