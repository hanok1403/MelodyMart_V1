import React, { useState } from "react";
import Home from './components/userComponents/Home'
import Footer from './Footer';

function App() {

  const [userId, setUserId] = useState('');

  const handleId = (id) => {
    setUserId(id);
  }


  return (
    <div>
      <Home userId={userId} handleId={handleId}/>
      <Footer/>
    </div>
  );
}

export default App;
