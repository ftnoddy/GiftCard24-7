import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import ModalLayout from "../Layouts/ModalLayout";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { X } from "lucide-react";
import axios from 'axios';
import { toast } from "react-toastify";
import { setCredentials } from "../../Redux/Slices/authSlice";
import { useDispatch } from 'react-redux';


const SignUp = ({ closeSignupModal, setShowSignupModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "", // Add mobile field to formData
    otp: "", // Add otp field to formData
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async () => {
    if (!formData.mobile) {
      toast.error('Please enter a mobile number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/users/send-otp', { mobile: formData.mobile });
      
      if (response.status === 200) {
        toast.success('OTP sent successfully');
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/api/users', formData);
  
      if (response.status === 201) {
        closeSignupModal();
        console.log("Response:", response.data);
        console.log('Signup successful');
        toast.success('Signup successful');

        setTimeout(() => {
          navigate('/');
        }, 2000);
  
        const { name, email, token, _id, isAdmin ,isVerified} = response.data;
  
        localStorage.setItem('userInfo', JSON.stringify({ name, email, token, _id, isAdmin, isVerified }));
  
        navigate('/profile', { state: { userName: name, userEmail: email, userVerify: isVerified } });
  
        dispatch(setCredentials(response.data));
  
     
      } else {
        console.error('Signup failed');
        toast.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Signup failed');
    }
  };



  return (
    <>
      <ModalLayout>
        <div className=" p-4 md:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <button onClick={closeSignupModal} className="w-8 h-8 bg-red-500 flex justify-center items-center rounded-full">
              <X className="text-white"/>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
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
            <div className="mb-4">
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

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
              <div className="flex">
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Your Mobile Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleSendOTP}>Send OTP</button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className=" flex flex-col items-center ">
              <button
                className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                type="submit"
              >
                Sign Up
              </button>
              <div className="flex mt-4 gap-1 text-blue-500">
                Already have an account?<span onClick={() => setShowSignupModal("login")} className="cursor-pointer hover:underline">Login</span>
              </div>
            </div>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default SignUp;
