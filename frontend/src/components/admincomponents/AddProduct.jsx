import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../../styles/Login.css";
import InputV from '../InputV';

const AddProduct = (props) => {
  const [formData, setFormData] = useState({
    productName: '',
    imageUrl: '',
    price: '',
    description: '',
    quantity: ''
  });

  useEffect(() => {
    if (props.type === 'edit') {
      // Fetch data from the database using props.id
      const fetchProductData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/admin/productEdit/${props.id}`);
          const data = response.data;
          setFormData({
            productName: data.productName || '',
            imageUrl: data.imageUrl || '',
            price: data.price || '',
            description: data.description || '',
            quantity: data.quantity || ''
          });
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchProductData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      var url='';
      if(props.type==='edit')
      url=`http://localhost:5000/admin/productEdit/${props.id}`;
    else
      url='http://localhost:5000/admin/addProduct';
      const response = await axios.post(url, formData);
      console.log('Product added:', response.data);
      setFormData({
        productName: '',
        imageUrl: '',
        price: '',
        description: '',
        quantity: ''
      });
    } catch (error) {
      console.error('There was an error adding the product:', error);
    }
  };

  return (
    <div>
      <center><h1>Adding Product</h1></center>
      <div className="login-wrapper">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
              <InputV type="text" name="productName" id="productName" ph="Enter product name" onchange={handleChange} data={formData.productName} />
              <InputV type="text" name="description" id="description" ph="Enter product description" onchange={handleChange} data={formData.description} />
              <InputV type="text" name="price" id="price" ph="Enter product price" onchange={handleChange} data={formData.price} />
              <InputV type="text" name="imageUrl" id="imageUrl" ph="Enter product image url" onchange={handleChange} data={formData.imageUrl} />
              <InputV type="number" name="quantity" id="quantity" ph="Enter product quantity" onchange={handleChange} data={formData.quantity} />
              <button type="submit">ADD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
