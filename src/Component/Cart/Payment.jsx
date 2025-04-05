import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Payment = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.new_price * item.quantity, 0);

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setLoading(true);

    try {
      const newOrder = {
        items: cart,
        total: totalPrice,
        date: new Date().toLocaleString(),
        paymentMethod,
        status: "Confirmed",
      };

      const userRes = await axios.get(`http://localhost:4000/users/${user.id}`);
      const existingOrders = userRes.data.orders || [];

      const updatedUser = {
        ...userRes.data,
        orders: [...existingOrders, newOrder],
        cart: [],
      };

      const patchRes = await axios.patch(
        `http://localhost:4000/users/${user.id}`,
        {
          orders: updatedUser.orders,
          cart: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (patchRes.status === 200 || patchRes.status === 204) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setCart([]);

        toast.success(`Payment successful via ${paymentMethod}! Order placed.`);
        navigate("/");
      } else {
        throw new Error("Failed to update user data");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message || error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment</h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700">Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-3">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                ₹{item.new_price * item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between font-semibold text-xl text-gray-800">
        <span>Total:</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Choose Payment Method</h3>
        <div className="flex flex-col gap-3">
          {["Credit Card", "UPI", "Cash on Delivery"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>{method === "Credit Card" ? "💳" : method === "UPI" ? "📲" : "💵"} {method}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full mt-6 py-3 rounded-lg text-lg font-medium shadow-md transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
