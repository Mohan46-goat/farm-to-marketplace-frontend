import React, { useEffect } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    useEffect(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        document.body.appendChild(firework);

        const fireworkAnimation = firework.animate([
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.5)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });

        fireworkAnimation.onfinish = () => {
            firework.remove();
        };

        return () => {
            firework.remove();
        };
    }, []);

    return (
        <div className="success-popup">
            <div className="success-popup-content">
                <p>Thanks For Your Purchase Keep Supporting Us</p>
            </div>
        </div>
    );
};

export default SuccessPopup;
