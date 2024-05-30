import React, { useState } from "react";
import ModalLayout from "../Layouts/ModalLayout";
import { X } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const KycVerification = ({ closeKycModal }) => {
  const [formData, setFormData] = useState({
    userName: "",
    dob: "",
    idProofType: "",
    idProofNo: "",
    email: "",
  });

  const [idProofImage, setIdProofImage] = useState(null); // State for file

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setIdProofImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('userName', formData.userName);
    formDataObj.append('dob', formData.dob);
    formDataObj.append('email', formData.email);
    formDataObj.append('idProofType', formData.idProofType);
    formDataObj.append('idProofNo', formData.idProofNo);
    formDataObj.append('idProofImage', idProofImage); // Add the file

    try {
      const response = await axios.post('http://localhost:5002/api/users/kyc-verification', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      toast.success('KYC verification successful');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while verifying KYC');
    }
  };

  return (
    <>
      <ModalLayout>
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">KYC Verification</h2>
            <button
              onClick={closeKycModal}
              className="w-8 h-8 bg-red-500 flex justify-center items-center rounded-full"
            >
              <X className="text-white" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">User Name:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="idProofType" className="block text-gray-700 font-semibold mb-2">ID Proof Type:</label>
              <select
                id="idProofType"
                name="idProofType"
                value={formData.idProofType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select ID Proof Type</option>
                <option value="passport">Passport</option>
                <option value="driverLicense">Driver License</option>
                <option value="aadharCard">Aadhar Card</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="idProofNo" className="block text-gray-700 font-semibold mb-2">ID Proof Number:</label>
              <input
                type="text"
                id="idProofNo"
                name="idProofNo"
                value={formData.idProofNo}
                onChange={handleChange}
                placeholder="Enter ID Proof Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="idProofImage" className="block text-gray-700 font-semibold mb-2">ID Proof Image:</label>
              <input
                type="file"
                id="idProofImage"
                name="idProofImage"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default KycVerification;
