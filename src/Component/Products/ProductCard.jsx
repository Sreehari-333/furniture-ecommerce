import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discount =
    product.old_price && product.new_price
      ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
      : null;

  return (
    <div className="border rounded-xl p-5 shadow-md bg-white transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
      
      {/* Product Image */}
      
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />

        {/* Discount Badge */}

        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Info */}

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

        {/* Price Section */}

        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="text-xl font-bold text-red-600">₹{product.new_price}</span>
          {product.old_price && (
            <span className="text-gray-500 line-through text-md">₹{product.old_price}</span>
          )}
        </div>

        {/* View Details Button */}

        <Link 
          to={`/product/${product.id}`} 
          className="inline-block mt-4 px-6 py-2 text-white font-medium rounded-lg bg-blue-600 shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
