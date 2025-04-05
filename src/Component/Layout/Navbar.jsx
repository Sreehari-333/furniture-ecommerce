import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext"; 
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  
  const [cartCount, setCartCount] = useState(0);

  
  useEffect(() => {
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">DecorNest</Link>
      </div>

      {/* Center Navigation */}
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-gray-400 transition">Home</Link>
        <Link to="/shop" className="hover:text-gray-400 transition">Shop</Link>
      </div>

      {/* Right Side (Profile, Cart, Login/Logout) */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            {/* Profile Link */}
            <Link to="/profile" className="flex items-center gap-2 hover:text-gray-400 transition">
              <FaUser className="text-lg" />
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
            
            {/* Logout Button */}
            <button 
              onClick={() => {
                logout();
                setCartCount(0); 
              }} 
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Login
          </Link>
        )}

        {/* Cart Icon with Counter */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl hover:text-gray-400 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 flex items-center justify-center min-w-[18px]">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
