import React from 'react';
import '../../styles/MusicItem.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Items(props) {
    function handleRemove(id){
        props.onRemove(id);
    };
    
    const handleEdit = (id) => {
      props.onEdit(id)
    };
  return (
    <div className="product-item card" key={props.key}>
      <img src={props.product.imageUrl} className="card-img-top product-image" alt={props.product.productName} />
      <div className="card-body">
        <h5 className="card-title">{props.product.productName}</h5>
        <p className="card-text">{props.product.description}</p>
        <p className="card-text"><strong>Price:</strong> ${props.product.price}</p>
        <p className="card-text">Remaining: {props.product.quantity}</p>
        <div className="btn-group mt-auto">
          <button onClick={() => handleEdit(props.product.productId)} className="btn btn-primary mx-1">Edit</button>
          <button onClick={() => handleRemove(props.product.productId)} className="btn btn-danger mx-1">Remove</button>
        </div>
      </div>
    </div>
  );
}

export default Items;


