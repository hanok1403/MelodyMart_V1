import React, {Routes, useState} from 'react';
import '../../styles/MusicItem.css';
import '../../styles/home.css';
import AdminNav from './AdminNav';
import Products from './Products';
const Admindashboard = () => {

  const [currWind, setcurrWind] = useState('')

  return (
    <>
      <AdminNav/>
      <Products/>
      {/* <h1>admin dashboard</h1> */}
    </>
      
  )
}

export default Admindashboard;
