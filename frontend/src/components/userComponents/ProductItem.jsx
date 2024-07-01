import React from 'react';
import '../../styles/productItem.css';

const ProductItem = ({ product }) => {
    const handleAddToCart = (id) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        fetch(`http://localhost:5001/home/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, user }) 
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="product-item max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img src={product.imageUrl} className="w-full product-image" alt={product.productName} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.productName}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-900 font-bold"><strong>Price:</strong> ${product.price}</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleAddToCart(product.productId)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
