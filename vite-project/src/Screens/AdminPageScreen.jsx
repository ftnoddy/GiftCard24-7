// src/pages/AdminPageScreen.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BoxLink from '../components/boxLink';

const AdminPageScreen = () => {
  const { user } = useContext(AuthContext);

  if (!user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        You are not allowed to view this page
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
      <div className="flex flex-wrap">
        <BoxLink title="All Users" route="/all-user-list" />
        <BoxLink title="KYC Users" route="/all-kyc-list" />
        <BoxLink title="All Orders" route="/all-orders" />
      </div>
    </div>
  );
};

export default AdminPageScreen;
