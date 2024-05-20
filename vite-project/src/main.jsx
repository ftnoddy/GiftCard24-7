import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen.jsx";
import AboutScreen from "./Screens/AboutScreen.jsx";
import SignleProductScreen from "./Screens/SignleProductScreen.jsx";
// import CartitemScreen from "./Screens/CartitemScreen.jsx";
import CartScreen from "./Screens/CartScreen.jsx";
import ProfileScreen from "./Screens/ProfileScreen.jsx";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen.jsx";
import AdminPageScreen from "./Screens/AdminPageScreen.jsx";
import TermsConditionsScreen from "./Screens/TermsConditionsScreen.jsx";
import RefReturnPoliciesScreen from "./Screens/RefReturnPoliciesScreen.jsx";
import ShippingPoliciesScreen from "./Screens/ShippingPoliciesScreen.jsx";
import Contact from "./Screens/ContactUsScreen.jsx";
import EmailVerificationScreen from "./Screens/EmailVerificationScreen.jsx";
import OrderSuccessfull from "./components/Modals/orderSuccessfull.jsx";
// import ErrorBoundary from "./components/ErrorBoundary.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      {/* <Route path="/cartitem" element={<CartitemScreen />} /> */}
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/product/:id" element={<SignleProductScreen />} />
      <Route path="/profile" element = {<ProfileScreen />} />
      <Route path="/payment-method" element={<PaymentMethodScreen/>} />
      <Route path="/admin" element={<AdminPageScreen/>} />
      <Route path="/Terms-Conditions" element={<TermsConditionsScreen />} />
      <Route path="/Refund-return" element={<RefReturnPoliciesScreen />} />
      <Route path="/Shipping-policies" element={<ShippingPoliciesScreen />} />
      <Route path="/verify-email:email" element={<EmailVerificationScreen />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/order-success" element={<OrderSuccessfull />} />

    </Route>
    
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);