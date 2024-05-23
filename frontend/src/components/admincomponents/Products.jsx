import React, { useEffect, useState } from 'react'

import Items from './Items';

function Products() {

    const [product, setProduct] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/admin/').then((response)=>{
            return response.json()
        }).then((data)=>{
            setProduct(data)
        }).catch(error => console.log(error));
    },[])

    const handleRemove = (id) => {
        fetch(`http://localhost:5000/admin/delete/${id}`, { method: 'get' })
          .then(response => response.json())
          .then(() => {
            setProduct(product.filter(prod => prod.productId !== id));
          })
          .catch(error => console.log(error));
      };
    
      const handleEdit = (id) => {
        // Implement the edit functionality
      };


  return (
    <div className="container">
        {/* <div className="row"> */}
            {
                // console.log(product) 
                product.map((item, i)=>{
                    return (
                        <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            {
                                <Items product={item} onRemove={handleRemove} onEdit={handleEdit}/>
                            }
                        </div>
                    )
                    
                })
            }
        {/* </div> */}
    </div>
  )
}

export default Products
