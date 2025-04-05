import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    new_price: "",
    old_price: "",
    category: "",
    image: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.new_price || !product.category || !product.image) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      toast.success("Product added successfully!");
      setProduct({
        name: "",
        new_price: "",
        old_price: "",
        category: "",
        image: "",
        status: "active",
      });
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="new_price"
          placeholder="New Price"
          value={product.new_price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="old_price"
          placeholder="Old Price (optional)"
          value={product.old_price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        
        
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="sofa">Sofa</option>
          <option value="mattresses">Mattresses</option>
          <option value="dining">Dining</option>
          <option value="lamps">Lamps</option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
