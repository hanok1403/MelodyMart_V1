import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/home.css';
import { useNavigate } from 'react-router-dom';
import Items from './Items';

function Products() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/admin/')
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.log(error));
    }, []);

    const handleRemove = (id) => {
        fetch(`http://localhost:5000/admin/delete/${id}`, { method: 'get' })
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
        <>
            {/* <h1>Product Management</h1> */}
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {product.map((item, i) => (
                        <div key={i} className="col mb-4">
                            <Items product={item} onRemove={handleRemove} onEdit={handleEdit} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Products;
