import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const navigate = useNavigate();
    
    const cardStyle = {
        '--product-image': `url(${product.image})`
    };

    useEffect(() => {
        let timer;
        if (isHovered) {
            timer = setTimeout(() => {
                setShowButtons(true);
            }, 800);
        } else {
            setShowButtons(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isHovered]);

    const addToCart = (e) => {
        e.preventDefault(); // Prevent event bubbling
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = currentCart.findIndex(item => item._id === product._id);
        
        if (existingItemIndex !== -1) {
            currentCart[existingItemIndex].quantity += 1;
        } else {
            currentCart.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(currentCart));
        navigate('/cart');
    };

    return (
        <div 
            className={`product-card ${isHovered ? 'hovered' : ''}`}
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-overlay"></div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">Rs {product.price}</p>
                <p className="description">{product.description}</p>
            </div>
            <div className={`product-buttons ${showButtons ? 'show' : ''}`}>
                <button 
                    onClick={addToCart} 
                    className="add-to-cart"
                    style={{ opacity: showButtons ? 1 : 0 }}
                >
                    Add to Cart
                </button>
                <Link 
                    to={`/products/${product._id}`} 
                    className="view-details"
                    style={{ opacity: showButtons ? 1 : 0 }}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
