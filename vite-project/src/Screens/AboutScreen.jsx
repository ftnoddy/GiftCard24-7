import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
const AboutScreen = () => {
  return (
    <MainLayout>
     <div className="h-screen w-screen bg-gradient-to-t from-red-700 via-rose-600 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-25 rounded-lg p-8 backdrop-blur-lg shadow-xl w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6 text-center">
          About GiftCard247.shop
        </h2>
        <p className="text-lg text-white mb-8">
          GiftCard247.shop provides you with the opportunity to make hassle-free shopping from various brands. We offer e-gift cards from a wide range of brands from across the globe, allowing you to shop for your favorite goodies and merchandise without any hassle.
        </p>
        <p className="text-lg text-white mb-8">
          Our gift cards are delivered via email, making it convenient for you to redeem them in-store or online, depending on the retail company’s policies. We specialize in providing customizable experiences for various occasions such as anniversaries, birthdays, weddings, and more. Embrace your special day and bring a smile to the faces of your loved ones by giving them our gift cards.
        </p>
        <p className="text-lg text-white mb-8">
          Thank you for shopping with us.
        </p>
      </div>
    </div>
    </MainLayout>
  );
};

export default AboutScreen;
