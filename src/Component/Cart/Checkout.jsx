import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.new_price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user || !user.id) {
      toast.error("User not found. Please log in again.");
      return;
    }
  
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
  
    navigate("/payment"); 
  };
  

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded-lg">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b py-3">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">₹{item.new_price * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex justify-between font-semibold text-xl text-gray-800">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all text-lg font-medium shadow-md"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
