import React from "react";
import { Outlet } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from 'react-redux';
function App() {
  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
