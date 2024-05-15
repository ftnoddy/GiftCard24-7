import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function TermsConditionsScreen() {
  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 mb-8 backdrop-filter backdrop-blur-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-pink-500">TERMS AND CONDITIONS</h1>
          <p className="text-white list-disc pl-6 text-lg">
            The terms and conditions outlined below govern the utilization of the online gift card services provided by us, an extended company of iWebGenics. These terms and conditions also assert that customers accessing services provided by GiftCards247.shop, is a subsidiary company of iWebGenics, agree to, understand, and are legally bound by them.
          </p>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 backdrop-filter backdrop-blur-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-pink-500">Fraud Prevention Measures:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>The company reserves the right to implement fraud prevention measures, including but not limited to, transaction monitoring, verification procedures, and account restrictions.</li>
            <li>Any suspicious activity detected may result in the suspension or termination of the user's account.</li>
          </ul>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-pink-500">Prohibited Activities:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>Users are prohibited from engaging in any fraudulent, illegal, or unauthorized activities related to the purchase or use of gift cards.</li>
            <li>This includes but is not limited to, using stolen payment methods, attempting to exploit loopholes in the system, or engaging in any form of identity theft.</li>
          </ul>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-pink-500">User Responsibilities:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>Users must provide accurate information when purchasing or redeeming gift cards.</li>
            <li>Users are responsible for maintaining the security of their account login information.</li>
            <li>Users should immediately report any unauthorized use of their account.</li>
          </ul>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-pink-500">Verification Process:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>The company may require users to undergo a verification process before purchasing or redeeming gift cards.</li>
            <li>This may involve providing additional information to confirm the user's identity and the legitimacy of the transaction.</li>
          </ul>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-pink-500">Limitation of Liability:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>GiftCards247 shall not be liable for any losses incurred due to unauthorized access to a user's account or fraudulent activities conducted by third parties.</li>
            <li>Users are responsible for taking appropriate measures to protect their account and report any suspicious activity immediately.</li>
          </ul>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-pink-500">Intellectual Property Rights:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>Users must respect the intellectual property rights of the company and any third parties involved in the creation or distribution of gift cards.</li>
            <li>Unauthorized reproduction, distribution, or sale of gift cards is strictly prohibited and may result in legal action.</li>
          </ul>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-pink-500">Platform Cost:</h2>
          <ul className="list-disc pl-6 text-white">
            <li>A platform cost will be applied to all gift card purchases made through our online platform.</li>
            <li>The platform cost is a nominal fee designed to cover the operational expenses, maintenance, and development of our platform, ensuring a seamless gift card purchasing experience for our users.</li>
            <li>The platform cost is disclosed and included in the total purchase amount displayed during the checkout process.</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default TermsConditionsScreen;
