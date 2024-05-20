import './App.css';
import { useState, useEffect } from 'react';




function App() {
  const [client, setClient] = useState([{}])

  useEffect(() => {
    fetch('/home').then(
      response => response.json()
    ).then(
      data => {
        setClient(data)
      }
    )
  }, [])

  return (
    <div>
      
      {
        (typeof client.users === 'undefined')?
        <div className="loading">
          <h1>Loading...</h1>
        </div>
          :
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Users</h4><br />
                    {
                      client.users.map((user, i)=>(
                        <p key={i}>{user.id} {user.name} {user.age}</p>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
      }

    </div>
  );
}

export default App;
