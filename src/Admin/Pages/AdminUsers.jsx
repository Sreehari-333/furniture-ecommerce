import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        const filtered = data.filter((user) => user.role !== "admin");
        setUsers(filtered);
      } catch (error) {
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const toggleBlock = async (id, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !currentStatus }),
      });
      if (!res.ok) throw new Error();
      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, blocked: updatedUser.blocked } : user
        )
      );
      toast.success(updatedUser.blocked ? "User blocked" : "User unblocked");
    } catch {
      toast.error("Failed to update block status");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        👥 Manage Users
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3 text-center">Status</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-t hover:bg-gray-50 transition-all duration-200 ${
                    user.blocked ? "bg-red-50 text-red-700" : ""
                  }`}
                >
                  <td className="border p-3 font-medium">{user.name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3 text-center">
                    {user.blocked ? "Blocked" : "Active"}
                  </td>
                  <td className="border p-3 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => toggleBlock(user.id, user.blocked)}
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        user.blocked
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ View User Detail Section */}
      {selectedUser && (
        <div className="mt-8 p-6 bg-gray-50 border rounded-xl shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-700">User Details</h3>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-red-600 hover:underline text-sm"
            >
              Close
            </button>
          </div>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {selectedUser.blocked ? "Blocked" : "Active"}
          </p>
          {selectedUser.orders?.length > 0 && (
            <>
              <h4 className="mt-4 font-semibold">Orders:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {selectedUser.orders.map((order, index) => (
                  <li key={index}>
                    ₹{order.total} on {order.date}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
