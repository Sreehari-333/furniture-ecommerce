import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Brand Name */}
        <div>
          <h2 className="text-2xl font-bold">FurniShop</h2>
          <p className="text-gray-400 mt-2">Quality furniture for every home.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
            <li><Link to="/cart" className="text-gray-400 hover:text-white">Cart</Link></li>
            <li><Link to="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-400">Email: support@furnishop.com</p>
          <p className="text-gray-400">Phone: +91 12345 67890</p>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} FurniShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;