import React from 'react';
import AdminNav from './AdminNav';
import Products from './Products';
import '../../styles/home.css';
import '../../styles/MusicItem.css';

const Admindashboard = () => {
  return (
    <>
      <AdminNav/>
      <div className="music-grid">  
        <Products/>
      </div>
    </>
      
  )
}

export default Admindashboard;
