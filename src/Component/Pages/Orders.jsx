import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${user?.id}`);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg">
        🛍️ Your Recent Orders
      </h2>

      {/* No Orders */}
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">No orders found.</p>
      ) : (
        <div className="space-y-4 mt-6">
          {orders
            .filter(order => order?.name && order?.quantity > 0 && order?.new_price > 0) 
            .slice(-2)
            .map((order, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 bg-gray-50 shadow-md flex items-center gap-4 hover:shadow-xl transition duration-300"
              >
                {/* Order Icon */}
                <FaBoxOpen className="text-3xl text-blue-500" />

                {/* Order Details */}
                <div>
                  <h3 className="font-semibold text-xl text-gray-800">
                    {order.name} <span className="text-gray-600">(x{order.quantity})</span>
                  </h3>
                  <p className="text-gray-600 font-medium mt-1">
                    Price: <span className="text-green-600 font-bold">₹{(order.new_price * order.quantity).toLocaleString("en-IN")}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
