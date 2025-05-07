import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * ProfileInfo component allows users to view and update their profile information.
 * It fetches user data on mount, provides form inputs for editing, and handles update and delete actions.
 */
const ProfileInfo = () => {
  // State variables for user profile fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API calls

  const navigate = useNavigate();

  // Fetch user profile data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Unauthorized. Please log in.');
      navigate('/login');
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setName(res.data.name || '');
        setEmail(res.data.email || '');
        setAddress(res.data.address?.address || '');
        setZip(res.data.address?.zip || '');
        setCity(res.data.address?.city || '');
        setCountry(res.data.address?.country || '');
        setState(res.data.address?.state || '');
        setPhoneNo(res.data.address?.phoneNo || '');
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        toast.error('Failed to load profile');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  // Handle profile update
  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Unauthorized. Please log in again.');
      return;
    }

    if (!name || !email || !address) {
      toast.error('Name, email, and address are required.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format.');
      return;
    }

    setLoading(true);
    axios.put(`http://localhost:3000/api/users/profile/${userId}`,
      { name, email, address, zip, city, country, state, phoneNo },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        toast.success('Profile updated successfully');
        navigate("/profile");
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        toast.error('Update failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle profile delete with confirmation
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Unauthorized. Please log in again.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    axios.delete(`http://localhost:3000/api/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('Profile deleted successfully');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/register');
      })
      .catch((err) => {
        console.error('Error deleting profile:', err);
        toast.error('Failed to delete profile');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Profile</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">Address</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">City</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">State</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">Country</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">Zip</label>
                <input
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-600">Phone No</label>
                <input
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleUpdate}
                className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                Update Profile
              </button>
              <button
                onClick={handleDelete}
                className="w-full md:w-auto bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={loading}
              >
                Delete Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
