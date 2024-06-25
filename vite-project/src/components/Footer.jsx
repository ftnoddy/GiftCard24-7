import React from "react";
import { Link } from "react-router-dom";
import { legalArray, linksArray, socialArray } from "../Array/footerArray";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="p-14 px-4 sm:px-8">
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
            <h1 className="text-base underline">LINK</h1>
            {linksArray.map((el) => (
              <Link
                key={el.id}
                to={el.route}
                className="hover:text-indigo-500 transition-all duration-300 text-sm"
              >
                {el.title}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <h1 className="font-semibold text-base underline">LEGAL</h1>
            {legalArray.map((el) => (
              <Link
                key={el.id}
                to={el.route}
                className="hover:text-indigo-500 transition-all duration-300 text-sm"
              >
                {el.title}
              </Link>
            ))}
          </div>
          <div className="">
            <h1 className="font-semibold text-base underline">Social</h1>
            <div className="flex gap-4 mt-4">
              {socialArray.map((el) => (
                <Link key={el.id} to={el.route} className="neon-hover">
                  <el.logoUrl />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="text-center mt-8 pb-2">
        <p className="text-xs">
          Copyright © 2024 - All right reserved designed by iWebGenics Pvt Ltd
        </p>
      </aside>

      <style jsx>{`
        .neon-hover {
          position: relative;
          display: inline-block;
        }

        .neon-hover:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          background: rgba(0, 255, 255, 0.5); /* Neon color */
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.5),
            0 0 30px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .neon-hover:hover:after {
          width: 100%;
          height: 100%;
          opacity: 1;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
