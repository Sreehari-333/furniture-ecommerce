import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-yellow-400">Manage Products</Link>
          <Link to="/admin/users" className="hover:text-yellow-400">Manage Users</Link>
          <Link to="/admin/addProducts" className="hover:text-yellow-400">Add Products</Link>
          <button onClick={logout} className="mt-10 text-red-400 hover:text-red-600">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold mb-4">Welcome, {user?.name}</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
