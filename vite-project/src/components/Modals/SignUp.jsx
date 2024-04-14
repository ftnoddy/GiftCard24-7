import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import ModalLayout from "../Layouts/ModalLayout";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const SignUp = ({closeSignupModal}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., validation, API call, etc.
    console.log(formData);
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
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
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
              <Link to="/login" className="text-blue-500 hover:underline mt-2">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default SignUp;
