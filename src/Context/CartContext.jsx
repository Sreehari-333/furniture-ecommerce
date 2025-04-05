import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:4000/users/${user.id}`)
        .then((res) => setCart(res.data.cart || []))
        .catch((err) => console.error("Error loading cart:", err));
    } else {
      setCart([]);
    }
  }, [user?.id]);

  const updateCartInServer = async (updatedCart) => {
    if (!user?.id) return; 
    try {
      await axios.patch(`http://localhost:4000/users/${user.id}`, {
        cart: updatedCart,
      });
      setCart(updatedCart);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };


  /////////////  Add TO Cart

  const addToCart = (product) => {
    if (!user?.id) return;

    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    updateCartInServer(updatedCart);
  };

  const removeFromCart = (productId) => {
    if (!user?.id) return;

    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCartInServer(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!user?.id) return;

    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(newQuantity, 1) }
        : item
    );
    updateCartInServer(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
