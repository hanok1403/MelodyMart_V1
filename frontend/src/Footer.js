// src/components/Footer.js         Footer component
import React from 'react';
import './styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <h4>MelodyMart</h4>
                        <ul>
                            <li><a href="/">About Us</a></li>
                            <li><a href="/">Contact Us</a></li>
                            <li><a href="/">Privacy Policy</a></li>
                            <li><a href="/">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Get Help</h4>
                        <ul>
                            <li><a href="/">FAQ</a></li>
                            <li><a href="/">Shipping</a></li>
                            <li><a href="/">Returns</a></li>
                            <li><a href="/">Order Status</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="/">Guitars</a></li>
                            <li><a href="/">Drums</a></li>
                            <li><a href="/">Keyboards</a></li>
                            <li><a href="/">Accessories</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="/"><i className="fab fa-facebook-f"></i></a>
                            <a href="/"><i className="fab fa-twitter"></i></a>
                            <a href="/"><i className="fab fa-instagram"></i></a>
                            <a href="/"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
