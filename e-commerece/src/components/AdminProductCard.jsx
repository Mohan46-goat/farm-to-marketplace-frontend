import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProductCard.css';

const AdminProductCard = ({ product, onDelete, onToggleMenu, isMenuActive }) => {
    const navigate = useNavigate();
    const cardStyle = {
        '--product-image': `url(${product.image})`
    };

    return (
<div className="admin-product-card" style={cardStyle}>
            {/* Three-dot menu */}
            <div className="admin-menu">
                <button 
                    className="admin-menu-button"
                    onClick={(e) => onToggleMenu(e, product._id)}
                >
                    ⋮
                </button>
                {isMenuActive && (
                    <div className="admin-dropdown">
                        <button 
                            className="admin-dropdown-item"
                            onClick={() => navigate(`/admin/update-product/${product._id}`)}
                        >
                            Update
                        </button>
                        <button 
                            className="admin-dropdown-item delete"
                            onClick={() => onDelete(product._id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">Rs{product.price}</p>
                <p className="description">{product.subname}</p>
                <p className="stock">Stock: {product.quantity}</p>
            </div>
        </div>
    );
};

export default AdminProductCard;
