import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ModeToggle from "./ModeToggle";
import { Segment, ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SignUp from "./Modals/SignUp";
import Login from "./Modals/Login";
import KycVerification from "./Modals/KycVerification";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function MobileNavbar() {
  const cart = useSelector((state) => state.cart);
  const { user, setUser } = useContext(AuthContext);
  const [showSignupModal, setShowSignupModal] = useState("");
  const [showKycModal, setShowKycModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const openSignupModal = () => {
    setShowSignupModal("signup");
  };

  const logoutUsers = async () => {
    try {
      await axios.post("https://giftcards247.shop/api/users/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      toast.success("Logout successful");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed");
    }
  };

  const closeSignupModal = () => {
    setShowSignupModal("");
  };

  const openKycModal = () => {
    setShowKycModal(true);
  };

  const closeKycModal = () => {
    setShowKycModal(false);
  };

  const handleOpenDropdown = () => {
    setShowDropdown(!showDropdown);
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
      {showKycModal && <KycVerification closeKycModal={closeKycModal} />}

      <div className="block sm:hidden">
        <div
          className={`navbar bg-base-100 border-b border-gray-300 shadow-lg fixed top-0 w-full z-10 ${
            showDropdown ? "h-full" : "h-16"
          }`}
        >
          <div className="fixed flex items-center top-0 right-0 w-full">
            <div className="flex-1">
              <img
                src="/images/gift_card.png" // Ensure this path is correct
                alt="Gift Card Logo"
                className="h-14"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl font-semibold text-purple-700">
                    {user ? user.name.slice(0, 2).toUpperCase() : null}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {!user && (
                    <li>
                      <a onClick={openSignupModal}>Sign Up</a>
                    </li>
                  )}
                  {user && (
                    <>
                      <li onClick={logoutUsers}>
                        <a>Logout</a>
                      </li>
                      <li>
                        <a onClick={openKycModal}>Complete Kyc</a>
                      </li>
                      <Link to="/profile">
                        <li>
                          <a>Profile</a>
                        </li>
                      </Link>
                    </>
                  )}
                </ul>
              </div>
              <Link to="/cart">
                <div className="relative">
                  <ShoppingBasket className="text-2xl cursor-pointer hover:text-purple-600 transition transform duration-200" />
                  {cart.length > 0 && (
                    <div className="absolute bg-purple-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full text-white">
                      {cart.length}
                    </div>
                  )}
                </div>
              </Link>
              <div onClick={handleOpenDropdown} className="cursor-pointer">
                <Segment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
