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
    <div className="card h-100" key={props.key}>
      <img src={props.product.imageUrl} alt={props.product.productName} className="card-img-top" height="100px" width="100px"/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.product.productName}</h5>
        <p className="card-text">{props.product.description}</p>
        <h6 className="card-price">${props.product.price}</h6>
        <p className="card-text">Remaining: {props.product.quantity}</p>
        <div className="mt-auto">
          <button onClick={()=>handleEdit(props.product.productId)} className="btn btn-primary mx-1">Edit</button>
          <button onClick={()=>handleRemove(props.product.productId)} className="btn btn-danger mx-1">Remove</button>
        </div>
      </div>
    </div>
  );
}

export default Items;
