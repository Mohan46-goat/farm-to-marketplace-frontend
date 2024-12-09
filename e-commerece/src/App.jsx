import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/adminpages/AdminDashboard';
import ManageProducts from './pages/adminpages/ManageProducts';
import ManageUsers from './pages/adminpages/ManageUsers';
import AddProductForm from './pages/adminpages/AddProductForm';
import UpdateProductForm from './pages/adminpages/UpdateProductForm';
import DeleteProductForm from './pages/adminpages/DeleteProductForm';
import DeleteUserForm from './pages/adminpages/DeleteUserForm';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/manage-products"
          element={user?.role === 'admin' ? <ManageProducts /> : <Navigate to="/login" />}
        />
        <Route
          path="/manage-users"
          element={user?.role === 'admin' ? <ManageUsers /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/add-product"
          element={user?.role === 'admin' ? <AddProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/update-product/:id"
          element={user?.role === 'admin' ? <UpdateProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/delete"
          element={user?.role === 'admin' ? <DeleteProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/add"
          element={user?.role === 'admin' ? <RegisterPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/update"
          element={user?.role === 'admin' ? <UpdateProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/delete"
          element={user?.role === 'admin' ? <DeleteUserForm /> : <Navigate to="/login" />}
        />

        {/* Customer Home */}
        <Route
          path="/home"
          element={user?.role === 'customer' ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Cart and Product Details Routes */}
        <Route
          path="/cart"
          element={user?.role === 'customer' ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/:id"
          element={user?.role === 'customer' ? <ProductPage /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;