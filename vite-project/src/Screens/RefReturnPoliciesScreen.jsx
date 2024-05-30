import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function RefReturnPoliciesScreen() {
  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 backdrop-filter backdrop-blur-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-pink-500">Refund and Return/Cancellation Policies</h1>
          <ul className="text-white list-disc pl-6 text-base space-y-4">
            <li>Online gift cards from GiftCard247.shop brought to you by iWebGenics are non-refundable and cannot be exchanged for cash.</li>
            <li>You can use our gift cards to redeem goods, merchandise, and services from the issued companies.</li>
            <li>Gift cards that are stolen, lost, or expired cannot be replaced or reimbursed.</li>
            <li>After the purchase is made, we will not be held liable for any instance.</li>
            <li>All the payments made by the customers are directly received by iWebGenics, which is the parent company of GiftCards247.shop.</li>
            <li>Refunds for gift card purchases may only be issued by the respective gift card issuer.</li>
            <li>GiftCards247 is an online gift card reseller website, therefore Giftcards247 shall not be held responsible for instances.</li>
            <li>Chargebacks initiated by users without valid reason may result in the suspension or termination of the user's account.</li>
            <li>Once the card is delivered, it cannot be canceled.</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default RefReturnPoliciesScreen;
