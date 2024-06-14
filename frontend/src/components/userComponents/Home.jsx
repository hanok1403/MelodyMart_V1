import React, { useEffect, useState } from 'react';
import '../../styles/home.css';
import ProductItem from './ProductItem';


const Home = (props) => {
  const [items, setItems] = useState([{}])
  useEffect(()=>{
    fetch('http://localhost:5000/home').then((response)=>{
        return response.json()
    }).then((data)=>{
        setItems(data)
    }).catch(error => console.log(error));
},[])

  return (
    <>
     <h1> This is Home page </h1>
     <div className="container">
     {
                items.map((item, i)=>{
                    return (
                        <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                <ProductItem product={item}/>
                        </div>
                    )
                })
            }
     </div>
    </>
    
  )
}

export default Home;
