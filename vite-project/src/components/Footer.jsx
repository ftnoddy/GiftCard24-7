import React from "react";
import { Link } from "react-router-dom";
import { legalArray, linksArray, socialArray } from "../Array/footerArray";

function Footer() {
  return (
    <footer className=" bg-gray-900 text-white w-full">
      <div className=" p-14 px-4 sm:px-8">
        <div className="grid gap-12 sm:gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          <div className="w-fit">
            <img
              src="/images/gift_card.png"
              alt="Your Logo"
              width={150}
              height={40}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <h1 className=" text-base underline">LINK</h1>
            {linksArray.map((el) => (
              <Link key={el.id} to={el.route} className="hover:text-indigo-500 transition-all duration-300 text-sm">
                {el.title}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <h1 className="font-semibold text-base underline">LEGAL</h1>
            {legalArray.map((el) => (
              <Link key={el.id} to={el.route} className="hover:text-indigo-500 transition-all duration-300 text-sm">
                {el.title}
              </Link>
            ))}
          </div>
          <div className="">
            <h1 className="font-semibold text-base underline">Social</h1>
            <div className="flex gap-4 mt-4">
              {socialArray.map((el) => (
                <Link key={el.id} to={el.route} className="">
                  <el.logoUrl />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      

      <aside className="text-center mt-8 pb-2">
        <p className="text-xs">Copyright © 2024 - All right reserved designed by iWebGenics Pvt Ltd</p>
      </aside>
    </footer>
  );
}

export default Footer;
