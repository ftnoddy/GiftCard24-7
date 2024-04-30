import { Outlet } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <Provider store={store}>
      <ToastContainer />
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
      </Provider>
    </>
  );
}

export default App;
