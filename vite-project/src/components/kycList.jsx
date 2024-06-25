import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KycList = () => {
  const [kycData, setKycData] = useState([]);

  const fetchKycData = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/users/getkyc-verification');
      setKycData(response.data);
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    }
  };

  useEffect(() => {
    fetchKycData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">KYC Users</h1>
      <p className="text-lg mb-8">Total KYC Users: {kycData.length}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
        onClick={fetchKycData}
      >
        Refresh KYC Data
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kycData.map(data => (
          <div key={data._id} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{data.userName}</h2>
            <p className="text-gray-700 mb-1"><strong>Date of Birth:</strong> {data.dob}</p>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {data.email}</p>
            <p className="text-gray-700 mb-1"><strong>ID Proof Type:</strong> {data.idProofType}</p>
            <p className="text-gray-700"><strong>ID Proof Number:</strong> {data.idProofNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KycList;
