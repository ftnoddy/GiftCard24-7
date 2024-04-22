import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import ModalLayout from "../Layouts/ModalLayout";
import { X } from "lucide-react";
import axios from 'axios';
import { toast } from "react-toastify";
import { setCredentials } from "../../Redux/Slices/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
const Login = ({ closeSignupModal, setShowSignupModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5002/api/users/login', formData);
      
      // Check if login was successful
      if (response.status === 200) {
        closeSignupModal()
        // Login successful
        console.log('Login successful');
        toast.success('Login successful');
        dispatch(setCredentials(response.data)); 
        // You can redirect to another page or perform any other action here
      } 
      else {
        // Login failed
        console.error('Login failed');
        toast.success('Login failed');
      }
    } catch (error) {
      // Network error or other errors
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ModalLayout>
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <button
              onClick={closeSignupModal}
              className="w-8 h-8 bg-red-500 flex justify-center items-center rounded-full"
            >
              <X className="text-white" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                type="submit"
              >
                Login
              </button>
              <div className="flex mt-4 gap-1 text-blue-500">
                Don't have an account?
                <span onClick={() => setShowSignupModal("signup")} className="cursor-pointer hover:underline">Sign up</span>
              </div>
            </div>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default Login;
