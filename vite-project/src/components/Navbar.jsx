import React, { useState } from "react";
import SignupPage from "./Modals/SignUp";
import CartButton from "./CartButton"; // Import the new CartButton component
import ModeToggle from "./ModeToggle";
import { Link } from "react-router-dom";

function Navbar() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
      {showSignupModal && <SignupPage closeSignupModal={closeSignupModal} />}
      <div>
        <div className="navbar bg-base-100 border-b border-gray-300 shadow-lg fixed top-0 w-full z-10">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>

          <div className="flex-none">
            <Link to="/" className="btn btn-ghost text-xl">ACCESSORIES</Link>
            <Link to="/about" className="btn btn-ghost text-xl">ABOUT</Link>
            <Link to="/" className="btn btn-ghost text-xl">CONTACT US</Link>
          {/* <ModeToggle /> */}
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={openSignupModal}>Sign Up</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
            <CartButton /> {/* Render the CartButton component */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
