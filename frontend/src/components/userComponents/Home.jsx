import React, {useEffect, useState} from 'react';
import '../../styles/home.css';
import NavBar from './NavBar';
const Home = (props) => {
  const userId = props.userId;
  const handleId = props.handleId;
  const [role, setRole] = useState('user')

  // useEffect(()=>{
  //   if(userId === ''){
  //     fetch(`https://localhost:5000/`)
  //   }
      
  // })


  return (
    <>
      <NavBar />
      
    </>
    
  )
}

export default Home;
