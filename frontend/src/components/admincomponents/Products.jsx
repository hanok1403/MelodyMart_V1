import React, { useEffect, useState } from 'react';
import '../../styles/home.css';
import { useNavigate } from 'react-router-dom';
import Items from './Items';

function Products() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/admin/')
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.log(error));
    }, []);

    const handleRemove = (id) => {
        fetch(`http://localhost:5001/admin/delete/${id}`, { method: 'get' })
            .then(response => response.json())
            .then(() => {
                setProduct(product.filter(prod => prod.productId !== id));
                alert('Product removed successfully');
            })
            .catch(error => console.log(error));
    };

    const handleEdit = (id) => {
        const values = { id: { id } };
        navigate('/admin/editProduct', { state: values });
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-8">Product Management</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {product.map((item, i) => (
                    <div key={i} className="mb-4">
                        <Items product={item} onRemove={handleRemove} onEdit={handleEdit} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
