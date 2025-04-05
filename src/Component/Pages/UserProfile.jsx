import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <p className="text-center text-gray-400 text-lg mt-10">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        {/* Profile Icon */}
        <FaUserCircle className="text-6xl text-gray-600 mx-auto mb-4" />

        {/* User Details */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm uppercase tracking-wide">Full Name</span>
            <p className="text-lg font-medium text-gray-800">{user.name}</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm uppercase tracking-wide">Email</span>
            <p className="text-lg font-medium text-gray-800">{user.email}</p>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold text-gray-700">Order History</h3>
          {user.orders && user.orders.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {user.orders.map((order, orderIndex) => (
                <li key={orderIndex} className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-gray-600 text-sm">Order Date: {new Date(order.date).toLocaleString()}</p>
                  <ul className="mt-2">
                    {order.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between border-b py-2">
                        <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                        <span className="text-green-600 font-medium">₹{item.new_price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-800 font-semibold mt-2">Total: ₹{order.total}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
