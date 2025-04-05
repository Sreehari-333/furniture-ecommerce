import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { getProducts } from "../../Services/api";
import ProductCard from "../Products/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((data) => {
    
      const activeProducts = data.filter(
        (product) => product.status === "active" || !product.status
      );

      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
    });
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    filterProducts(selectedCategory, searchQuery);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterProducts(category, event.target.value);
  };

  const filterProducts = (category, search) => {
    let filtered = products;
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="p-6">
      {/* Search Bar & Category Filters */}
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-lg w-full max-w-md mb-4"
        />
        <div className="flex gap-4">
          {["all", "sofa", "mattresses", "dining", "lamps"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg ${category === cat ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
