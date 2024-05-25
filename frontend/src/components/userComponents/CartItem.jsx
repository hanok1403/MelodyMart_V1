import React from 'react';
import '../../styles/CartItem.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartItem(props) {
    const handleIncrement = (id) => {
        props.onIncrement(id);
    };

    const handleDecrement = (id) => {
        props.onDecrement(id);
    };

    return (
        <div className="card h-100" key={props.key}>
            <img src={props.product.imageUrl} alt={props.product.productName} className="card-img-top" height="100px" width="100px" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{props.product.productName}</h5>
                <p className="card-text">{props.product.description}</p>
                <h6 className="card-price">${props.product.price}</h6>
                <p className="card-text">Quantity: {props.product.quantity}</p>
                <div className="mt-auto">
                    <button onClick={() => handleIncrement(props.product.productId)} className="btn btn-success mx-1">+</button>
                    <button onClick={() => handleDecrement(props.product.productId)} className="btn btn-warning mx-1">-</button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
