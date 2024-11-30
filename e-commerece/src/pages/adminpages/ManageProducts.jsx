import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProductAPI } from '../../services/productService';
import AdminProductCard from '../../components/AdminProductCard';
import './admin.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log('Products data:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = (e, productId) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveMenu(activeMenu === productId ? null : productId);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductAPI(productId);
      // Refresh the products list after successful deletion
      fetchProducts();
      // Close the dropdown menu
      setActiveMenu(null);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Management</h2>
      
      <div className="d-flex justify-content-end mb-4">
        <button 
          className="btn btn-primary"
onClick={() => navigate('/admin/add-product')}
        >
          Add Product
        </button>
      </div>

{/* Product Cards */}
      <div className="product-list">
        {products.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onToggleMenu={toggleMenu}
            isMenuActive={activeMenu === product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
