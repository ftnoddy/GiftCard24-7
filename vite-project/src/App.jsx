import { Outlet } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { SnackbarProvider } from 'notistack';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <ToastContainer />
        <AuthContextProvider>
          <Outlet />
        </AuthContextProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
