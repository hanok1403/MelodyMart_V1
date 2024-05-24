import React from 'react';
import "../../styles/login.css";
import InputV from '../InputV';
const AddProduct = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    //hable backend for adding products
    };
  return (
    
    <div >
      <center><h1>Adding Product</h1></center>
      <div className="login-wrapper">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
              <InputV type="text" name="id" id="id" value={"Enter product id"}/>
              <InputV type="text" name="name" id="name" value={"Enter product name"}/>
              <InputV type="text" name="price" id="price" value={"Enter product price"}/>
              <InputV type="text" name="description" id="description" value={"Enter product description"}/>
              <button type="submit">"ADD"</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;

