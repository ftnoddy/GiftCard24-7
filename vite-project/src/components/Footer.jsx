import React from 'react';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer fixed bottom-0 left-0 right-0 p-10 bg-gray-900 text-white">
      <nav className="grid grid-flow-col gap-4">
      <Link to="/Terms-Conditions" className="">
      Terms & Conditions
            </Link>
            <Link to="/Shipping-policies" className="">
            Shipping policies
            </Link>
            <Link to="/Refund-return" className="">
            Refund & return policies
            </Link>

      </nav> 
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"></svg></a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"></svg></a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"></svg></a>
        </div>
      </nav> 
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  );
}

export default Footer;
