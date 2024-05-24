import React from 'react';
import { useLocation } from 'react-router-dom';
import AddProduct from './AddProduct';
 
const EditProduct = () => {
    const location = useLocation();
    const { id } = location.state || {};
    console.log(id);
  return (
    <div>
      <AddProduct type='edit' id={id}/>
    </div>
  )
}

export default EditProduct
