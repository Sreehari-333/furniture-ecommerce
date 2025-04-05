import { useEffect, useState, useContext } from "react";
import { Users, ShoppingCart, PackageCheck, Activity } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        const nonAdminUsers = data.filter((u) => u.role !== "admin");
        setUsers(nonAdminUsers);

        const allOrders = nonAdminUsers.flatMap((user) =>
          user.orders?.map((order, index) => ({
            id: `${user.id}-${index + 1}`,
            userName: user.name,
            totalAmount: order.total,
            date: order.date,
          })) || []
        );

        setOrders(allOrders);
      });

    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const chartData = orders.map((order) => ({
    name: `#${order.id} (${order.userName})`,
    amount: order.totalAmount,
  }));

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-500" size={40} />} label="Users" value={users.length} />
        <StatCard icon={<PackageCheck className="text-green-500" size={40} />} label="Products" value={products.length} />
        <StatCard icon={<ShoppingCart className="text-yellow-500" size={40} />} label="Orders" value={orders.length} />
        <StatCard icon={<Activity className="text-purple-500 animate-pulse" size={40} />} label="Site Status" status="Live" />
      </div>

      {/* Order Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Order Revenue Overview</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, angle: -25, textAnchor: "end" }}
                height={60}
              />
              <YAxis tickFormatter={(value) => `₹${value}`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="amount" fill="url(#colorBar)" radius={[6, 6, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">📉 No orders to display yet.</p>
            <p className="text-sm">Once users place orders, revenue will appear here.</p>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-6">Recent Orders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-semibold text-gray-800 mb-1">{order.userName}</p>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-green-700 mb-3">₹{order.totalAmount}</p>
              <p className="text-xs text-gray-400">Order Date: {order.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, status }) => (
  <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
    {icon}
    <div>
      <h3 className="text-xl font-semibold">
        {typeof value !== "undefined" ? value : <span className="text-green-500">{status}</span>}
      </h3>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

export default AdminDashboardHome;
