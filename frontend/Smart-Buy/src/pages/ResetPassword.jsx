import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    email : ""
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = async () => {
    const { newPassword, confirmPassword,email } = formData;
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/reset-password`,
        { newPassword, confirmPassword,email }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-20 shadow py-8 px-6 bg-white max-w-md mx-auto rounded">
      <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChanges}
        placeholder="Enter email"
        className="border border-gray-300 rounded-md px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <PasswordInput
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChanges}
        placeholder={"Enter New Password"}
      />
      <PasswordInput
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChanges}
        placeholder={"Confirm Password"}
      />
      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
