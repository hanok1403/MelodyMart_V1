// Products.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/home.css';
import { useNavigate } from 'react-router-dom';
import Items from './Items';
import AdminSearchbar from './AdminSearchbar';

function Products() {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/admin/')
      .then((response) => response.json())
      .then((data) => {
        const validProducts = data.filter(prod => prod.quantity > 0);
        setProduct(validProducts);
        setFilteredProduct(validProducts);
      })
      .catch((error) =>  console.log(error));
  }, []);

  const handleRemove = (id) => {
    fetch(`http://localhost:5001/admin/delete/${id}`, { method: 'get' })
      .then(response => response.json())
      .then(() => {
        if(window.confirm("Do you want to remove the Product?") === true){
          setProduct(product.filter(prod => prod.productId !== id));
          setFilteredProduct(filteredProduct.filter(prod => prod.productId !== id));
          alert('Product removed successfully');
        } else {
          return;
        }
      })
      .catch(error =>  console.log(error));
  };

  const handleEdit = (id) => {
    const values = { id: { id } };
    navigate('/admin/editProduct', { state: values });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-2 text-center pt-3">Product Management</h1>
      <AdminSearchbar products={product} setFilteredItems={setFilteredProduct} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProduct.map((item, i) => (
          <div key={i} className="mb-4">
            <Items product={item} onRemove={handleRemove} onEdit={handleEdit} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
