import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBasket } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import ModeToggle from "./ModeToggle";
import SignUp from "./Modals/SignUp";
import Login from "./Modals/Login";
import KycVerification from "./Modals/KycVerification";
import { AuthContext } from "../context/AuthContext";

function Navbar({ onSearch }) {
  const cart = useSelector((state) => state.cart);
  const { user, setUser } = useContext(AuthContext);
  const [showSignupModal, setShowSignupModal] = useState("");
  const [showKycModal, setShowKycModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  const openSignupModal = () => {
    setShowSignupModal("signup");
  };

  const logoutUsers = async () => {
    try {
      await axios.post('https://giftcards247.shop/api/users/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      toast.success("Logout successful");
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
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

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Update the search query in Accessories component
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery); // Ensure the search query is updated on submit
  };

  return (
    <>
      {showSignupModal === "signup" && (
        <SignUp setShowSignupModal={setShowSignupModal} closeSignupModal={closeSignupModal} />
      )}
      {showSignupModal === "login" && (
        <Login setShowSignupModal={setShowSignupModal} closeSignupModal={closeSignupModal} />
      )}
      {showKycModal && <KycVerification closeKycModal={closeKycModal} />}

      <div className="hidden sm:block">
        <div className="navbar bg-white border-b border-gray-300 shadow-lg fixed top-0 w-full z-10">
          <div className="flex-1">
            <Link to="/">
              <img
                src="/images/gift_card.png"
                alt="Your Logo"
                className="h-14"
              />
            </Link>
          </div>

          <div className="flex-none flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="input input-bordered rounded-l-full w-full max-w-xs"
              />
              
            </form>
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 transition duration-300 neon-border"
            >
              ACCESSORIES
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 transition duration-300 neon-border"
            >
              ABOUT
            </Link>
            {user && user.isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-gray-900 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 transition duration-300 neon-border"
              >
                ADMIN
              </Link>
            )}
            
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-gray-900 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 transition duration-300 neon-border"
            >
              CONTACT US
            </Link>
            {/* <Link to="/filter-products" className="text-gray-700 hover:text-gray-900 font-medium text-smpx-4 py-2 transition duration-300 neon-border">FILTER OPTIONS</Link> */}

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
                {!user && (
                  <li>
                    <a onClick={openSignupModal} className="hover:bg-gray-200 transition duration-300">Sign Up</a>
                  </li>
                )}
                {user && (
                  <>
                    <li>
                      <a onClick={logoutUsers} className="hover:bg-gray-200 transition duration-300">Logout</a>
                    </li>
                    <li>
                      <a onClick={openKycModal} className="hover:bg-gray-200 transition duration-300">Complete Kyc</a>
                    </li>
                    <Link to="/profile">
                      <li>
                        <a className="hover:bg-gray-200 transition duration-300">Profile</a>
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <Link to="/cart">
              <div className="relative">
                <ShoppingBasket className="text-2xl cursor-pointer hover:text-purple-600 transition transform duration-300" />
                {cart.length > 0 && (
                  <div className="absolute bg-purple-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full text-white">
                    {cart.length}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .neon-border {
          position: relative;
          display: inline-block;
          padding-bottom: 2px;
        }

        .neon-border:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #0ff; /* Neon color */
          box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .neon-border:hover:after {
          opacity: 1;
        }
      `}</style>
    </>
  );
}

export default Navbar;
