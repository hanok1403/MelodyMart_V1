import React, { useEffect, useState } from 'react';
import MusicItem from './MusicItem';

const Cart = () => {

  const [cart, setCart] = useState('[]')

  useEffect(()=>{
    fetch('https://localhost:5000/')
  })

  return (
    <div>
      <h1>Cart Section</h1>
      <MusicItem/>
    </div>
  )
}

export default Cart;
