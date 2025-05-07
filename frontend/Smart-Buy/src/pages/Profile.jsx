import { useNavigate, Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { useState,useEffect } from 'react';

const Profile = () => {
  const navigate= useNavigate();
  const [name, setName] = useState('');
useEffect(() => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  if (!token || !userId) return;

  axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setName(res.data.name || "User"))
  .catch(err => console.error("Failed to fetch name:", err));
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="bg-blue-600 text-white p-6 flex items-center gap-4">
          <CgProfile className="text-4xl" />
          <div>
            <h1 className="text-xl font-bold">Hello, {name}</h1>
            <p className="text-sm">Welcome to your profile</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 space-y-4">
          <div className="text-lg font-semibold">Account Settings</div>
          <div className="space-y-2">
            <Link to="/profile-info">
            <div className="border-b py-2">Profile Information</div>
            </Link>
            <div className="border-b py-2">Manage Address</div>
            <Link to="/Change-password"><div className="border-b py-2">Change Password</div></Link>
          </div>
          <div className="text-lg font-semibold">Other Actions</div>
          <div className="space-y-2">
            <Link to="/My-Orders"><div className="border-b py-2">My Orders</div></Link>
            <div className="border-b py-2">Payments</div>
            <Link to="/chat-With-us">
            <div className="border-b py-2">Chat with Support</div>
            </Link>
          </div>
          <button className='bg-red-800 text-white font-medium py-1 px-4 rounded-2xl ' onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
