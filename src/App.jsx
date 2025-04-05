import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./Component/Layout/Navbar";
import { CartProvider } from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import Footer from "./Component/Layout/Footer";
import AuthProvider from "./Context/AuthContext";
import { useEffect } from "react";

////////  Wrapper component to use hooks inside Router
const AppWrapper = () => {
  const location = useLocation();

  /////// Check if current route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  
  useEffect(() => {
    if (isAdminRoute) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.go(1); 
      };
    } else {
      window.onpopstate = null; 
    }
  }, [isAdminRoute]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      {!isAdminRoute && <Navbar />}
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppWrapper />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
