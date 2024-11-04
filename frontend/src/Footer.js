import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">MelodyMart</h4>
                        <ul>
                            <li className="mb-2"><a href="/" className="hover:text-gray-400">About Us</a></li>
                            <li className="mb-2">
                                <a href="mailto:contact@melodymart.com" className="hover:text-gray-400">Contact Us</a>
                            </li>
                            <li className="mb-2"><a href="/" className="hover:text-gray-400">Privacy Policy</a></li>
                            <li className="mb-2"><a href="/" className="hover:text-gray-400">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Get Help</h4>
                        <ul>
                            <li className="mb-2"><a href="/" className="hover:text-gray-400">FAQ</a></li>
                            <li className="mb-2"><a href="/" className="hover:text-gray-400">Shipping</a></li>
                            <li className="mb-2">
                                <a href="mailto:contact@melodymart.com" className="hover:text-gray-400">Contact Us</a>
                            </li>
                            <li className="mb-2"><a href="/" className="hover:text-gray-400">Order Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="/" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
                            <a href="/" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
                            <a href="/" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
                            <a href="/" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
