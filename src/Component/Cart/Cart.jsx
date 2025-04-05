import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.new_price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link to="/shop" className="text-blue-500 hover:underline text-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-5"
            >
              <div className="flex items-center space-x-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-lg">
                    ₹{item.new_price} x {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span className="text-xl">{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 ml-6 text-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold">Total: ₹{totalPrice}</h3>
            <Link
              to="/checkout"
              className="mt-5 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-xl"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
