import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getProductById } from "../../Services/api";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    addToCart(product);
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
      <div className="mt-3 flex items-center space-x-3">
        <span className="text-lg text-red-500 font-semibold">₹{product.new_price}</span>
        <span className="text-gray-500 line-through text-sm">₹{product.old_price}</span>
        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">-{Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% Off</span>
      </div>
      <div className="mt-6 flex space-x-3">
        <button 
          onClick={handleAddToCart} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add to Cart
        </button>
        {/* <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Checkout
        </button> */}
      </div>
    </div>
  );
};

export default ProductDetails;
