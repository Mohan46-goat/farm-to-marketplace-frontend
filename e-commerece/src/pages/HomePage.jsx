import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './homepage.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleLogout = () => {
        // Custom logout function
        localStorage.removeItem('token');
        navigate('/');
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <button onClick={handleLogout} className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </button>
                <h1>Welcome to Our Farm-To-Marketplace</h1>
                <p>Find the best products just for you!</p>
                <a href="#products" className="cta-btn">Shop Now</a>
            </section>

            {/* Products Section */}
            <section id="products" className="products-section">
                <h2>Our Latest Products</h2>
                <div className="product-list">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Up Arrow Icon */}
            <div className="up-arrow-icon" onClick={scrollToTop}>
                <i className="fas fa-angle-up"></i>
            </div>
        </div>
    );
};

export default HomePage;
