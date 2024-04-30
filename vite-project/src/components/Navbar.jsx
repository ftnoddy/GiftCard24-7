import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ModeToggle from "./ModeToggle";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SignUp from "./Modals/SignUp";
import Login from "./Modals/Login";
import KycVerification from "./Modals/KycVerification"; // Import the KycVerification component
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const userName = useSelector((state) => state.auth.userInfo.name);
  const cart = useSelector((state) => state.cart);
  const {user, setUser} = useContext(AuthContext)
  const [showSignupModal, setShowSignupModal] = useState("");
  const [showKycModal, setShowKycModal] = useState(false);

  const openSignupModal = () => {
    setShowSignupModal("signup");
  };

  // const logoutModel = () => {

  //   toast.success("success");
  // };

  const logoutUsers = async () => {
    try {
      await axios.post('http://localhost:5002/api/users/logout'); // Use POST method for logout
      toast.success("Logout successful");
      localStorage.removeItem('userInfo')
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Logout failed"); // Show error toast message
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
            {/* Replace anchor tag with image tag for the logo */}
            <img
              src="https://api.asm.skype.com/v1/objects/0-sa-d9-352eeffed2071b2609778285d7e8da5a/views/imgpsh_fullsize_anim" // Replace with the URL of your logo image
              alt="Your Logo" // Add an appropriate alt text for accessibility
              className="h-12" // Adjust height as needed
            />
          </div>

          <div className="flex-none">
            <Link to="/" className="btn btn-ghost text-xl">
              ACCESSORIES
            </Link>
            <Link to="/about" className="btn btn-ghost text-xl">
              ABOUT
            </Link>
            {user && <Link to="/admin" className="btn btn-ghost text-xl">
              ADMIN
            </Link>}
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
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl font-semibold text-purple-700">
                  {user ? user?.name?.slice(0, 2).toUpperCase() : null}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {!user && <li>
                  <a onClick={openSignupModal}>Sign Up</a>
                </li>}
                {user !== null && <li onClick={logoutUsers}>
                  <a>Logout</a>
                </li>}
                {user !== null && <li>
                  <a onClick={openKycModal}>Complete Kyc</a>
                </li>}
                {user && <Link to="/profile">
                  <li>
                    <a>Profile</a>
                  </li>
                </Link>}
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
