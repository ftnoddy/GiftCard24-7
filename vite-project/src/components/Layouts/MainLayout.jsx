import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import MobileNavbar from "../MobileNavbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MobileNavbar />
      <Navbar />
      <div className="min-h-screen h-full">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
