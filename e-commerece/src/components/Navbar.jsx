import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate('/');
    };

    const cartItemCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="logo">
                    <i className="fas fa-store-alt"></i>
                    <span>E-Shop</span>
                </Link>
            </div>
            
            <div className="nav-right">
                <Link to="/cart" className="cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                    {cartItemCount > 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                    )}
                </Link>
                
                <div className="profile-menu">
                    <button 
                        className="profile-icon"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        aria-label="Profile menu"
                    >
                        {user ? (
                            <i className="fas fa-user-circle"></i>
                        ) : (
                            <i className="fas fa-user"></i>
                        )}
                    </button>
                    
                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            {user?.role === 'admin' ? (
                                <>
                                    <Link to="/admin" className="dropdown-item">
                                        <i className="fas fa-tachometer-alt"></i>
                                        Admin Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item">
                                        <i className="fas fa-sign-out-alt"></i>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="dropdown-item">
                                    <i className="fas fa-sign-in-alt"></i>
                                    Admin Login
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Navbar.css'; // External CSS for styling

// const Navbar = () => {
//     const { user, logout } = useAuth();
//     const [menuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(prev => !prev);
//     };

//     return (
//         <nav className="navbar">
//             <div className="logo">
//                 <Link to="/">MSP</Link>
//             </div>
//             <div className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
//                 &#9776; {/* This is the burger icon */}
//             </div>
//             <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
//             <li><Link to="/register">Register</Link></li>
//                 <li><Link to="/">Home</Link></li>
//                 {user ? (
//                     <>
//                         <li><Link to="/admin">Admin Dashboard</Link></li>
//                         <li><button onClick={logout} className="logout-btn">Logout</button></li>
//                     </>
//                 ) : (
//                     <li><Link to="/login" className="login-btn">Login</Link></li>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;

