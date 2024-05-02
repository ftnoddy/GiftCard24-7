import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function RefReturnPoliciesScreen() {
  return (
    <MainLayout>
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 backdrop-filter backdrop-blur-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-pink-500">Refund and Return Policies</h1>
        <ul className="text-white list-disc pl-6 text-lg">
          <li>Online gift cards from GiftCard247.shop are non-refundable and cannot be exchanged for cash.</li>
          <li>You can use our gift cards to redeem goods, merchandise, and services from the issued companies.</li>
          <li>Gift cards that are stolen, lost, or expired cannot be replaced or reimbursed.</li>
          <li>After the purchase is made, we will not be held liable for any instance.</li>
        </ul>
      </div>
    </div>
    </MainLayout>
  );
}

export default RefReturnPoliciesScreen;
