// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import axios from "axios";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [category, setCategory] = useState("all");

//   useEffect(() => {
//     axios.get("http://localhost:4000/products")
//       .then(response => {
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//       })
//       .catch(error => console.error("Error fetching products:", error));
//   }, []);

//   const handleCategoryChange = (category) => {
//     setCategory(category);
//     if (category === "all") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter(product => product.category === category));
//     }
//   };

//   return (
//     <div className="p-4">
     
//       <div className="flex gap-4 mb-4">
//         {['all', 'sofa', 'mattresses', 'dining', 'lamp'].map(cat => (
//           <button 
//             key={cat} 
//             className={`px-4 py-2 border rounded ${category === cat ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} 
//             onClick={() => handleCategoryChange(cat)}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>
      
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map(product => (
//           <div key={product.id} className="border p-4 rounded-lg shadow-md">
//             <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
//             <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
//             <p className="text-gray-600">${product.price}</p>
//             <Link to={`/product/${product.id}`} className="block mt-2 px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700">
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

