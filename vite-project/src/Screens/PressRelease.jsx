import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

function PressRelease() {
  return (
    <MainLayout>
      <div className="bg-zinc-100 dark:bg-zinc-800 p-6 md:p-12 lg:p-24 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              src="/images/gift_card.png"
              alt="GiftCards247.shop Logo"
              className="w-36 h-32 mx-auto rounded-full"
            />
            <h1 className="text-1xl md:text-2xl font-bold mt-3">
              GiftCards247.shop: Empowering the gifting sector with comprehensive e-gift card solutions
            </h1>
          </div>
          <div className="mt-6 text-lg leading-relaxed">
            <p>
              This newcomer to the e-commerce world, GiftCards247.shop by iWebGenics, went live on June 1st, 2024, reselling e-gift cards from popular brands globally.
            </p>
            <p className="mt-4">
              Founded on the concept of making gift giving as easy as possible for the giver as well as the recipient, GiftCards247.shop seeks to become the go-to e-gift card service that enables users to easily select and dispatch gift cards that fit the interests of the intended beneficiary. Free from the constraints of location, GiftCards247.shop provides convenient solutions for desired gifts, guaranteeing that memorable occasions are not dampened by distance or isolation.
            </p>
            <p className="mt-4">
              In the words of founders, "We are indeed very proud to announce GiftCards247.shop to the open market. Choosing gifts in this era of huge demands is even a daunting task, so we, with GiftCards247.shop, are helping the buyers to provide their loved ones with the freedom of choice and select the BOG with the huge variety of the trusted brands."
            </p>
            <p className="mt-4">
              From its website, GiftCards247.shop provided simple interface for the customers in which they are able to choose the desired e-gift cards under different categories in fashion, electronics, fine dining, and many others. It’s our joy to offer Convenience and Care at GiftCards247.shop for any occasion whether it’s Birthday Gifts, Anniversary, or any special occasion.
            </p>
            <p className="mt-4">
              At GiftCards247.shop, our focus is placed on the security of the system so that our users can rely on it. Their transactions are safe, and recipients of e-gift cards shall receive their gifts as soon as possible.
            </p>
            <p className="mt-4">
              For further detailed findings regarding GiftCards247.shop and the e-gift cards it offers, please click on
            </p>
            <h2 className="text-xl md:text-2xl font-bold mt-8">About GiftCards247.shop:</h2>
            <p className="mt-4">
              It is an e-gift card solution from various trusted brands that you can get from its parent company iWebGenics known as GiftCards247.shop. Having speed, flexibility, and reliability as its strengths, GiftCards247.shop is established to become the market’s leader in providing remote gifting services suitable for the recipients’ choices. For more information please see: <a href="https://giftcards247.shop/" className="text-blue-500 dark:text-blue-300">https://giftcards247.shop/</a>
            </p>
            <h2 className="text-xl md:text-2xl font-bold mt-8">About iWebGenics:</h2>

            <p className="mt-4">
              iWebGenics is a pioneering technology company dedicated to innovation and excellence in the digital landscape. As the parent company of GiftCards247.shop, iWebGenics is committed to providing cutting-edge solutions that enhance the lives of consumers worldwide. For more information, visit: <a href="https://iwebgenics.com/" className="text-blue-500 dark:text-blue-300">https://iwebgenics.com/</a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PressRelease;
