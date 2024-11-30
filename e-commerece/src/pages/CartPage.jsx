import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SuccessPopup from '../components/SuccessPopup';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
        calculateTotal(items);
    };

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const updatedItems = cartItems.map(item => 
            item._id === productId ? { ...item, quantity: newQuantity } : item
        );
        
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        calculateTotal(updatedItems);
    };

    const removeFromCart = (productId) => {
        const updatedItems = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        calculateTotal(updatedItems);
    };

    const handleBuyNow = () => {
        if (!user) {
            // Store current cart state
            localStorage.setItem('pendingPurchase', 'true');
            // Redirect to login
            navigate('/login');
            return;
        }

        // If user is logged in, proceed with purchase
        setShowSuccessPopup(true);
        // Clear cart after successful purchase
        localStorage.removeItem('cart');
        setCartItems([]);
        setTotal(0);
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        navigate('/'); // Redirect to home after closing popup
    };

    if (cartItems.length === 0 && !showSuccessPopup) {
        return (
            <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            {showSuccessPopup && (
                <SuccessPopup onClose={handleClosePopup} />
            )}
            
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p className="price">${item.price}</p>
                            <p className="description">{item.description}</p>
                        </div>
                        <div className="quantity-controls">
                            <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="quantity-btn"
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="quantity-btn"
                            >
                                +
                            </button>
                        </div>
                        <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                            className="remove-item"
                            onClick={() => removeFromCart(item._id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Cart Total: ${total.toFixed(2)}</h3>
                <button 
                    className="buy-now-button"
                    onClick={handleBuyNow}
                >
                    {!user ? 'Login to Purchase' : 'Buy Now'}
                </button>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default CartPage;
