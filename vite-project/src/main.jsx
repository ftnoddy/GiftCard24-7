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

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);