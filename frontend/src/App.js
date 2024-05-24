import React, { useState } from "react";
import Home from './components/userComponents/Home'

function App() {

  const [userId, setUserId] = useState('');

  const handleId = (id) => {
    setUserId(id);
  }


  return (
    <div>
      <Home userId={userId} handleId={handleId}/>
    </div>
  );
}

export default App;
