// src/components/ProductItem.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';

const ProductItem = ({ product }) => {

    const handleAddToCart = (id, quantity) => {
        if(!window.confirm('Do you want to add this item to cart?'))
            return ;

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        fetch(`/api/home/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, user, quantity }) 
        }).then((response) => {
            // console.log(response);
            toast.success("Product added to cart",{
                autoClose:2000
            })
        });
    };

    return (
        <div className="product-item max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition duration-300 ease-in-out hover:scale-105">
            <img src={product.imageUrl} className="card-img-top product-image mb-4" alt={product.productName} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.productName}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-900 font-bold"><strong>Price:</strong> ${product.price}</p>
                <p className="text-gray-900 font-bold py-2"><strong>Quantity remaining:</strong> {product.quantity}</p>
                <button className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleAddToCart(product.productId, 1)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductItem;
