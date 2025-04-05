import { Routes, Route } from "react-router-dom";
import Home from "../Component/Pages/Home";
import Orders from "../Component/Pages/Orders";
import ProductDetails from "../Component/Products/ProductDetails";
import Cart from "../Component/Cart/Cart";
import Login from "../Component/Auth/Login";
import Shop from "../Component/Pages/Shop";
import UserProfile from "../Component/Pages/UserProfile";
import Checkout from "../Component/Cart/Checkout";
import Payment from "../Component/Cart/Payment";

import AdminDashboard from "../Admin/Pages/AdminDashboard";
import ManageProducts from "../Admin/Pages/ManageProducts";
import AdminRoute from "../Admin/Routes/AdminRoutes";
import AdminUsers from "../Admin/Pages/AdminUsers";
import AddProduct from "../Admin/Pages/AddProduct";
import AdminDashboardHome from "../Admin/Pages/AdminDashboardHome";

const AppRoutes = () => {
  return (
    <Routes>

      {/*  User Routes */}
      
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />


      {/*///// Admin Protected Routes ///////*/}


      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminDashboard />}>
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="addProducts" element={<AddProduct />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
