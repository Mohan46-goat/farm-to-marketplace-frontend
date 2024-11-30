import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './homepage.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
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
        </div>
    );
};

export default HomePage;
