import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function Services() {
  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-2xl w-full mx-4 backdrop-filter backdrop-blur-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4 text-pink-500">OUR SERVICES</h1>
          <p className="text-white text-base mb-3">
            Welcome to GiftCards247.shop, where e-gifting has never been easier! Say goodbye to the hassle of traditional gifting and embrace the convenience of sending e-gift cards from the comfort of your own home. This is because our platform is designed to provide easy bulk gifting in mass remotely to the people you care about to make them happy no matter where they are in the world.
          </p>
          <p className="text-white text-base mb-3">
            From our website, customers can select from a wide array of e-gift cards for various merchants, restaurants, and even events, ensuring that the gift effectively reaches the right people via electronic mail. Whether it is a wedding, an anniversary, a birthday, Christmas or any other festive event, or just to express your care and concern, our website will make it easy for you to order your gifts online with the simplest of steps.
          </p>
          <p className="text-white text-base mb-4">
            Join us in creating a new era of gifting convenience. Visit GiftCards247.shop today and experience the ease of bulk e-gifting like never before.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Services;
