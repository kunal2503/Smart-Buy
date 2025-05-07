import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChanges = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    // Password match validation
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }

    // Password length validation (minimum 6 characters)
    if (newPassword.length < 6) {
      toast.error("New Password must be at least 6 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/auth/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-20 shadow py-8 px-6 bg-white max-w-md mx-auto rounded ">
      <h1 className="text-2xl font-bold mb-2">Change Password</h1>
      
      <PasswordInput
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChanges}
        placeholder={"Enter Old Password"}
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
        placeholder={"Confirm New Password"}
      />
      
      <button
        onClick={handlePassword}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Change Password
      </button>
    </div>
  );
};

export default ForgetPassword;
