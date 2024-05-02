import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function ShippingPoliciesScreen() {
  return (
    <MainLayout>
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 backdrop-filter backdrop-blur-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-pink-500">Shipping Policies</h1>
        <ul className="text-white list-disc pl-6 text-lg">
          <li>Our online gift cards will be delivered to you electronically via emails.</li>
          <li>We will send you the gift card shortly after we receive the payment.</li>
          <li>A minimal sum of money will be charged for shipping the cards to the customers electronically.</li>
          <li>You will receive confirmation from us via email and track and monitor your gift delivery.</li>
        </ul>
      </div>
    </div>
    </MainLayout>
  );
}

export default ShippingPoliciesScreen;
