import React, { useEffect } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ onClose }) => {
    useEffect(() => {
        // Close popup automatically after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="success-popup-overlay">
            <div className="success-popup">
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="success-content">
                    <i className="fas fa-check-circle"></i>
                    <h2>Purchase Successful!</h2>
                    <p>Thank you for your purchase</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopup;
