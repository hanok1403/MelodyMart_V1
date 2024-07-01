// src/components/ProductItem.js
import React from 'react';
import '../../styles/productItem.css';

const ProductItem = ({ product }) => {
    const handleAddToCart = (id) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        fetch(`http://localhost:5000/home/${id}`, {
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
        <div className="product-item card">
            <img src={product.imageUrl} className="card-img-top product-image" alt={product.productName} />
            <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.productId)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductItem;
