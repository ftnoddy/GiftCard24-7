import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPageScreen() {
  const [users, setUsers] = useState([]);
  const [kycData, setKycData] = useState([]);

  useEffect(() => {
    // Fetch users' data from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/users'); // Replace '/api/users' with your actual backend API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleGetKycData = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/users/kyc-verification'); // Fetch KYC data from the backend
      setKycData(response.data);
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Users</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleGetKycData}
      >
        Get KYC Data
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.isAdmin ? 'Admin' : 'Regular'}</td>
                {/* Add more table cells for additional user data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {kycData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">KYC Data</h2>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Date of Birth</th>
                <th className="px-4 py-2">ID Proof Type</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {kycData.map(data => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{data.userName}</td>
                  <td className="border px-4 py-2">{data.dob}</td>
                  <td className="border px-4 py-2">{data.idProofType}</td>
                  <td className="border px-4 py-2">{data.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPageScreen;
