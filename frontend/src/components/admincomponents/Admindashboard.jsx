import React from 'react';
import '../../styles/MusicItem.css';
import '../../styles/home.css';
import AdminNav from './AdminNav';
import Products from './Products';
const Admindashboard = () => {
  return (
    <>
      <AdminNav/>
      <div className="music-grid">  
      <Products/>
      </div>
      {/* <h1>admin dashboard</h1> */}
    </>
      
  )
}

export default Admindashboard;
