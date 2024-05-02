import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function TermsConditionsScreen() {
  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 backdrop-filter backdrop-blur-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-pink-500">Terms and Conditions</h1>
          <p className="text-white list-disc pl-6 text-lg">
            The terms and conditions below mentioned govern the use of the online gift card services provided by us. 
            These terms and conditions also declare that the services accessed by the customers provided by GiftCard247.shop 
            are agreed, understood, and are bound by the customers.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default TermsConditionsScreen;
