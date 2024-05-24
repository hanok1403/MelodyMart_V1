import React from 'react';
import '../styles/home.css';
import MusicItem from './MusicItem';
const Home = () => {
  return (
    <div className="music-grid">
     {/* { data.map((info)=>{ */}
         <MusicItem 
        // className="music-item" 
        // key={info.id} 
        // info={info.name} 
        // desc={info.email}
        // img={info.src}
        />
      {/* })} */}
    </div>
  )
}

export default Home;
