import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/addProduct.css';
import InputV from '../InputV';
import { useNavigate } from 'react-router-dom';

const AddProduct = (props) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productHead: 'ADD PRODUCT',
    productButton: 'ADD'
  });

  const [formData, setFormData] = useState({
    productName: '',
    imageUrl: '',
    price: '',
    description: '',
    quantity: ''
  });

  useEffect(() => {
    if (props.type === 'edit') {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/admin/productEdit/${props.id}`);
          const data = response.data;
          setFormData({
            productName: data.productName || '',
            imageUrl: data.imageUrl || '',
            price: data.price || '',
            description: data.description || '',
            quantity: data.quantity || ''
          });
          setProduct({
            productHead: 'EDIT PRODUCT',
            productButton: 'Edit'
          });
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchProductData();
    }
  }, [props.id, props.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = props.type === 'edit'
        ? `http://localhost:5001/admin/productEdit/${props.id}`
        : 'http://localhost:5001/admin/addProduct';
      const method = props.type === 'edit' ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: formData
      });
      
      console.log('Product added/edited:', response.data);
      setFormData({
        productName: '',
        imageUrl: '',
        price: '',
        description: '',
        quantity: ''
      });
      alert(props.type==='edit'?'Product details edited successfully':'Product added successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('There was an error adding/editing the product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="text-center">{product.productHead}</h1>
      <div className="add-product-form-wrapper">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <InputV type="text" name="productName" id="productName" ph="Enter product name" onchange={handleChange} data={formData.productName} />
          </div>
          <div className="form-group">
            <InputV type="text" name="description" id="description" ph="Enter product description" onchange={handleChange} data={formData.description} />
          </div>
          <div className="form-group">
            <InputV type="text" name="price" id="price" ph="Enter product price" onchange={handleChange} data={formData.price} />
          </div>
          <div className="form-group">
            <InputV type="text" name="imageUrl" id="imageUrl" ph="Enter product image url" onchange={handleChange} data={formData.imageUrl} />
          </div>
          <div className="form-group">
            <InputV type="number" name="quantity" id="quantity" ph="Enter product quantity" onchange={handleChange} data={formData.quantity} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">{product.productButton}</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
