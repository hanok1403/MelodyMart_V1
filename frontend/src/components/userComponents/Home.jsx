import React, {useEffect, useState} from 'react';
import '../../styles/home.css';
import NavBar from './NavBar';
const Home = () => {

  const [role, setRole] = useState('user')

  useEffect(()=>{
    fetch(`https://localhost:5000/`)
  })


  return (
    <>
      <NavBar />
      
    </>
    
  )
}

export default Home;
