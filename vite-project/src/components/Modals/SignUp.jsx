import React, { useState } from "react";
import ModalLayout from "../Layouts/ModalLayout";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from 'axios';
import { toast } from "react-toastify";
import { setCredentials } from "../../Redux/Slices/authSlice";
import { useDispatch } from 'react-redux';

const SignUp = ({ closeSignupModal, setShowSignupModal }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const { name, email, password, contact } = formData;

    if (!name || !email || !password || !contact) {
      toast.error('Please fill in all the fields');
      return;
    }

    try {
      const response = await axios.post(' https://giftcards247.shop/api/users/send-otp-mail', {
        name: name,
        email: email,
      });

      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setStep(2);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const { name, email, password, contact, otp } = formData;

    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      const response = await axios.post(' https://giftcards247.shop/api/users', {
        name,
        email,
        password,
        contact,
        otp
      });

      if (response.status === 201) {
        toast.success('Signup successful');
        const { name, email, contact, token, _id, isAdmin, isVerified } = response.data;
        localStorage.setItem('userInfo', JSON.stringify({ name, email, contact, token, _id, isAdmin, isVerified }));
        dispatch(setCredentials(response.data));

        setTimeout(() => {
          closeSignupModal();
          navigate('/', { state: { userName: name, userEmail: email, contact, userVerify: isVerified } });
        }, 2000);
      } else {
        toast.error('Signup failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid or expired OTP');
    }
  };

  return (
    <ModalLayout>
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <button onClick={closeSignupModal} className="w-8 h-8 bg-red-500 flex justify-center items-center rounded-full">
            <X className="text-white"/>
          </button>
        </div>
        <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
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
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
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
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
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
                <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Your Mobile Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                  Send OTP
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">
                    OTP
                  </label>
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
                <button className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                  Verify OTP
                </button>
              </>
            )}
            <div className="flex mt-4 gap-1 text-blue-500">
              Already have an account?
              <span onClick={() => setShowSignupModal("login")} className="cursor-pointer hover:underline">
                Login
              </span>
            </div>
          </form>
        </div>
      </ModalLayout>
    );
  };
  
  export default SignUp;
