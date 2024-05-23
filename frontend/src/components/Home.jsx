import React from 'react';
import data from '../assets/TestData/data.json';
import '../styles/home.css';
import MusicItem from './MusicItem';
const Home = () => {
  return (
    <div className="music-grid">
     { data.map((info)=>{
        return <MusicItem className="music-item" 
        key={info.id} 
        info={info.name} 
        desc={info.email}
        img={info.src}
        />
      })}
    </div>
  )
}

export default Home;
