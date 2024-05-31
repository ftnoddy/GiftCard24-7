import React from "react";
import MainLayout from "../components/Layouts/MainLayout";

function TermsConditionsScreen() {
  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-16 ">
        <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-3xl w-full mx-4 mb-8 backdrop-filter backdrop-blur-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-pink-500">
            TERMS AND CONDITIONS
          </h1>
          <p className="text-white list-disc pl-6 text-lg">
            The terms and conditions outlined below govern the utilization of
            the online gift card services provided by us, an extended company of
            iWebGenics. These terms and conditions also assert that customers
            accessing services provided by GiftCards247.shop, is a subsidiary
            company of iWebGenics, agree to, understand, and are legally bound
            by them.
          </p>
        </div>
        
      </div>
    </MainLayout>
  );
}

export default TermsConditionsScreen;
