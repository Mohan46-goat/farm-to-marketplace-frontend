import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductByIdAPI } from '../services/productService';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetchProductByIdAPI(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const addToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = currentCart.findIndex(item => item._id === product._id);
        
        if (existingItemIndex !== -1) {
            currentCart[existingItemIndex].quantity += quantity;
        } else {
            currentCart.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(currentCart));
        navigate('/cart');
    };

    if (!product) {
        return (
            <div className="loading-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="product-details">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                    <div className="price">Rs{product.price}</div>
                    
                    <div className="quantity-selector">
                        <span>Quantity:</span>
                        <div className="quantity-controls">
                            <button 
                                onClick={() => handleQuantityChange(-1)}
                                className="quantity-btn"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button 
                                onClick={() => handleQuantityChange(1)}
                                className="quantity-btn"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    <button onClick={addToCart} className="add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
