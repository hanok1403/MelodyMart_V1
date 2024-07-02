// src/components/ProductItem.js
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';

const ProductItem = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (id, quantity) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        fetch(`http://localhost:5001/home/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, user, quantity }) 
        }).then((response) => {
            console.log(response);
            setShowModal(false); 
        });
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(0, Math.min(product.quantity, parseInt(e.target.value)));
        setQuantity(value);
    };

    return (
        <div className="product-item max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition duration-300 ease-in-out hover:scale-105">
            <img src={product.imageUrl} className="card-img-top product-image mb-4" alt={product.productName} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.productName}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-900 font-bold"><strong>Price:</strong> ${product.price}</p>
                <button className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}>Add to Cart</button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="p-4">
                    <Modal.Header closeButton>
                        <Modal.Title>Add to Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={product.quantity}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                        <button className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleAddToCart(product.productId, quantity)}>
                            Add to Cart
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
};

export default ProductItem;
