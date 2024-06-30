// import React from 'react';
import '../../styles/CartItem.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CartItem(props) {
//     const handleIncrement = (id) => {
//         props.onIncrement(id);
//     };

//     const handleDecrement = (id) => {
//         props.onDecrement(id);
//     };

//     return (
//         <div className="card h-100" key={props.key}>
//             <img src={props.product.imageUrl} alt={props.product.productName} className="card-img-top" height="100px" width="100px" />
//             <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{props.product.productName}</h5>
//                 <p className="card-text">{props.product.description}</p>
//                 <h6 className="card-price">${props.product.price}</h6>
//                 <p className="card-text">Quantity: {props.product.quantity}</p>
//                 <div className="mt-auto">
//                     <button onClick={() => handleIncrement(props.product.productId)} className="btn btn-success mx-1">+</button>
//                     <button onClick={() => handleDecrement(props.product.productId)} className="btn btn-warning mx-1">-</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CartItem;

import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onRemove }) => {
  const { productId, name, price, quantity, imageUrl } = item;

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      onRemove(productId);
    }
  };

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{name}</h3>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Quantity: {quantity}</p>
        <p className="cart-item-total">Total: ${(price * quantity).toFixed(2)}</p>
      </div>
      <button onClick={handleRemove} className="remove-button">&times;</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
