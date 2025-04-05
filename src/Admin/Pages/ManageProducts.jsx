import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [editingProduct, setEditingProduct] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", price: "" });

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const softDeleteProduct = async (id) => {
    if (!window.confirm("Hide this product?")) return;
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "inactive" }),
      });
      toast.success("Product hidden");
      fetchProducts();
    } catch (error) {
      toast.error("Error hiding product");
    }
  };

  const reactivateProduct = async (id) => {
    if (!window.confirm("Reactivate this product?")) return;
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      });
      toast.success("Product reactivated");
      fetchProducts();
    } catch (error) {
      toast.error("Error reactivating product");
    }
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod.id);
    setEditValues({ name: prod.name, price: prod.new_price });
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editValues.name,
          new_price: Number(editValues.price),
        }),
      });
      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const filtered = products.filter((prod) =>
    filter === "all" ? true : prod.status === filter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.new_price - b.new_price;
    return 0;
  });

  const start = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sorted.slice(start, start + productsPerPage);
  const totalPages = Math.ceil(sorted.length / productsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="mr-2 font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((prod) => (
                <tr key={prod.id} className="text-center">
                  <td className="p-3 border">{prod.id}</td>

                  {/* Name Field */}
                  <td className="p-3 border">
                    {editingProduct === prod.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editValues.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      prod.name
                    )}
                  </td>

                  {/* Price Field */}
                  <td className="p-3 border">
                    {editingProduct === prod.id ? (
                      <input
                        type="number"
                        name="price"
                        value={editValues.price}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      `₹${prod.new_price}`
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-3 border">
                    {prod.status === "inactive" ? (
                      <span className="text-red-500 font-semibold">Inactive</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 border space-x-2">
                    {editingProduct === prod.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(prod.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="bg-gray-300 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        {prod.status === "active" ? (
                          <button
                            onClick={() => softDeleteProduct(prod.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            onClick={() => reactivateProduct(prod.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Reactivate
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
