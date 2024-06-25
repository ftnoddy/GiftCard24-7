import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <p className="text-lg mb-8">Total Users: {users.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user._id} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700 mb-1"><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'Regular'}</p>
            <p className="text-gray-700 mb-1"><strong>Contact:</strong> {user.contact}</p>
            <p className="text-gray-700"><strong>Created At:</strong> {moment(user.createdAt).format('YYYY-MM-DD')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
