import React from "react";
import { Outlet } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Provider store={store}>
      <ToastContainer />
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
