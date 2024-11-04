import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
    quantity: '',
    category: ''
  });

  const categories = [
    "Indian Instruments",
    "Keyboards/Pianos",
    "Guitars",
    "Amplifiers",
    "Band Instruments",
    "Drums",
    "Percussion Instruments",
    "String Instruments",
    "Wind Instruments",
  ];

  useEffect(() => {
    if (props.type === 'edit') {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(`/api/admin/productEdit/${props.id}`);
          const data = response.data;
          setFormData({
            productName: data.productName || '',
            imageUrl: data.imageUrl || '',
            price: data.price || '',
            description: data.description || '',
            quantity: data.quantity || '',
            category: data.category || ''
          });
          setProduct({
            productHead: 'EDIT PRODUCT',
            productButton: 'EDIT'
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

    if (name === 'quantity' && value < 1) {
      alert('Quantity must be a positive number');
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.quantity < 1) {
      alert('Quantity must be a positive number');
      return;
    }

    try {
      const url = props.type === 'edit'
        ? `/api/admin/productEdit/${props.id}`
        : `/api/admin/addProduct`;
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
        quantity: '',
        category: ''
      });
      toast.success(
        props.type === 'edit' ? 'Product details edited successfully' : 'Product added successfully',
        {
          onClose: () => {
            navigate('/admin/dashboard');
          }
        }
      );
      
      // alert(props.type === 'edit' ?'Product details edited successfully' : 'Product added successfully');
      // navigate('/admin/dashboard');
    } catch (error) {
      console.error('There was an error adding/editing the product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{product.productHead}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Enter product image url"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter product quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              min={1}
              required
            />
          </div>
          <div className="mb-4">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            >
              <option value="" disabled>Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-300">
            {product.productButton}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        pauseOnHover
        closeOnClick
        limit={3}
      />
    </div>
  );
};

export default AddProduct;
