import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModeToggle from "./ModeToggle";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SignUp from "./Modals/SignUp";
import Login from "./Modals/Login";
import KycVerification from "./Modals/KycVerification"; // Import the KycVerification component
import { toast } from "react-toastify";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const [showSignupModal, setShowSignupModal] = useState("");
  const [showKycModal, setShowKycModal] = useState(false); // State to control KYC modal visibility

  const openSignupModal = () => {
    setShowSignupModal("signup");
  };

const logoutModel = () =>{
  toast.success("success")
}

  const closeSignupModal = () => {
    setShowSignupModal("");
  };

  const openKycModal = () => {
    setShowKycModal(true);
  };

  const closeKycModal = () => {
    setShowKycModal(false);
  };

  return (
    <>
      {showSignupModal === "signup" && (
        <SignUp
          setShowSignupModal={setShowSignupModal}
          closeSignupModal={closeSignupModal}
        />
      )}
      {showSignupModal === "login" && (
        <Login
          setShowSignupModal={setShowSignupModal}
          closeSignupModal={closeSignupModal}
        />
      )}
      {showKycModal && <KycVerification closeKycModal={closeKycModal} />}{" "}
      {/* Pass closeKycModal function as prop */}
      <div>
        <div className="navbar bg-base-100 border-b border-gray-300 shadow-lg fixed top-0 w-full z-10">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>

          <div className="flex-none">
            <Link to="/" className="btn btn-ghost text-xl">
              ACCESSORIES
            </Link>
            <Link to="/about" className="btn btn-ghost text-xl">
              ABOUT
            </Link>
            <Link to="/" className="btn btn-ghost text-xl">
              CONTACT US
            </Link>
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
                <li onClick ={logoutModel} >
                  <a>Logout</a>
                </li>
                <li>
                  <a onClick={openKycModal}>Complete Kyc</a>
                </li>
              </ul>
            </div>
            <Link to={"/cart"}>
            <div className="relative">
              <ShoppingBasket className="text-2xl cursor-pointer hover:text-purple-600 transition transform duration-200" />

              {cart.length > 0 && (
                <div className="absolute bg-purple-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full top- text-white">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
