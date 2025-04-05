import { createContext, useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const cartContext = useContext(CartContext);
  const setCart = cartContext ? cartContext.setCart : () => {};

  ////// Check sessionStorage (admin) or localStorage (normal user)
  useEffect(() => {
    const adminUser = sessionStorage.getItem("user");
    const normalUser = localStorage.getItem("user");
    const storedUser = adminUser || normalUser;

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.cart) {
        setCart(parsedUser.cart);
      }
    }

    setLoading(false);
  }, []);

  ////// Auto remove sessionStorage (admin) on browser close
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem("user");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  /////// Login Function
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:4000/users");

      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      const foundUser = users.find((u) => u.email === email && u.password === password);

      if (!foundUser) {
        toast.error("Invalid Email or Password");
        return false;
      }

      if (foundUser.blocked) {
        toast.error("Your account has been blocked. Contact the admin.");
        return false;
      }

      /////// Ensure user has cart
      if (!foundUser.cart) {
        foundUser.cart = [];
        await fetch(`http://localhost:4000/users/${foundUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: [] }),
        });
      }

      /////// Store user data 
      if (foundUser.role === "admin") {
        sessionStorage.setItem("user", JSON.stringify(foundUser));
      } else {
        localStorage.setItem("user", JSON.stringify(foundUser));
      }

      setUser(foundUser);
      setCart(foundUser.cart || []);
      toast.success("Login successful!");

      const redirectPath = foundUser.role === "admin" ? "/admin/dashboard" : "/";
      navigate(redirectPath);
      return true;
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong.");
      return false;
    }
  };

  //////// Signup Function
  const signup = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:4000/users");
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        toast.error("Email already exists.");
        return false;
      }

      const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        password,
        role: "user",
        cart: [],
      };

      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      toast.success("Signup successful! Please login.");
      return true;
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong.");
      return false;
    }
  };

  // ✅ Logout Function
  const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    navigate("/", { replace: true }); 
    toast.info("Logged out successfully.");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
