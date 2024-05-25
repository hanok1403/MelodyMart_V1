import axios from 'axios';
import React, { useState } from 'react';
import "../../styles/login.css";
import InputV from '../InputV';

const AddProduct = (props) => {
  const [formData, setFormData] = useState({
    productName: '',
    imageUrl:'',
    price: '',
    description: '',
    quantity:''
  });
  if(props.type==='edit'){
    //get data from data base using props.id
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/admin/productEdit/${props.id}`);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit =async (event) => {
    // console.log(event)
    event.preventDefault();
    console.log(formData);
    //Handle backend for adding products
    await axios.post('http://localhost:5001/admin/addProduct', formData)
       .then(response => {
         console.log('Product added:', response.data);
        setFormData({
          name: '',
          imageUrl:'',
          price: '',
          description: '',
          quantity:''
         });
       })
       .catch(error => {
         console.error('There was an error adding the product:', error);
       });
  };
  return (
    
    <div >
      <center><h1>Adding Product</h1></center>
      <div className="login-wrapper">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
              {/* <InputV type="text" name="id" id="id" ph={"Enter product id"} onchange={handleChange} data={formData.id}/> */}
              <InputV type="text" name="productName" id="productName" ph={"Enter product name"} onchange={handleChange} data={formData.productName}/>
              <InputV type="text" name="description" id="description" ph={"Enter product description"} onchange={handleChange} data={formData.description}/>
              <InputV type="text" name="price" id="price" ph={"Enter product price"} onchange={handleChange} data={formData.price}/>
              <InputV type="text" name="imageUrl" id="imageUrl" ph={"Enter product image url"} onchange={handleChange} data={formData.imageUrl}/>
              <InputV type="number" name="quantity" id="quantity" ph={"Enter product quantity"} onchange={handleChange} data={formData.quantity}/>
              <button type="submit">ADD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;

