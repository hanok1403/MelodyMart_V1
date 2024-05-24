import React, { useState } from 'react';
import '../../styles/MusicItem.css';
import '../../styles/home.css';
import Products from './Products';


const Admindashboard = () => {

  const [currWind, setcurrWind] = useState('')

  return (
    <>
      <Products />
      {/* <h1>admin dashboard</h1> */}
    </>
      
  )
}

export default Admindashboard;
