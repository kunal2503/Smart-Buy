import React, { useState } from 'react';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ value, onChange, placeholder, name }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev); // ✅ safe toggle
    };

    return (
        <div className='relative w-full max-w-sm'>
            <input
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
                placeholder={placeholder || "Enter password"}
                className='w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                aria-label="Password"
            />
            <div
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600'
                aria-label="Toggle password visibility"
            >
                {showPassword ? <AiFillEyeInvisible aria-hidden="true" /> : <AiFillEye aria-hidden="true" />}
            </div>
        </div>
    );
};

export default PasswordInput;
