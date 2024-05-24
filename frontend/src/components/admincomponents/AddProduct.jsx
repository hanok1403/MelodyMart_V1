import React, { useState } from 'react';
import "../../styles/login.css";
import InputV from '../InputV';
const AddProduct = (props) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(formData);
    //Handle backend for adding products
    // await axios.post('http://localhost:5000/admin/addProduct', JSON.stringify(formData))
    //    .then(response => {
    //      console.log('Product added:', response.data);
        setFormData({
          id: '',
          name: '',
          price: '',
          description: ''
         });
      //  })
      //  .catch(error => {
      //    console.error('There was an error adding the product:', error);
      //  });
  };
  return (
    
    <div >
      <center><h1>Adding Product</h1></center>
      <div className="login-wrapper">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
              <InputV type="text" name="id" id="id" ph={"Enter product id"} onchange={handleChange} data={formData.id}/>
              <InputV type="text" name="name" id="name" ph={"Enter product name"} onchange={handleChange} data={formData.name}/>
              <InputV type="text" name="price" id="price" ph={"Enter product price"} onchange={handleChange} data={formData.price}/>
              <InputV type="text" name="description" id="description" ph={"Enter product description"} onchange={handleChange} data={formData.description}/>
              <button type="submit">ADD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;

