import React from 'react';
import './externalCss/ScrollToTopButton.css';

const ScrollToTopButton = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className="scroll-to-top-button" onClick={handleScrollToTop}>
            ↑ {/* Unicode character for up arrow */}
        </button>
    );
};

export default ScrollToTopButton;
