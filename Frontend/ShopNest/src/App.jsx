import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./pages/Login/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return <div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    <AuthProvider>
      <Dashboard />
    </AuthProvider>,
  </div>;
}

export default App;
