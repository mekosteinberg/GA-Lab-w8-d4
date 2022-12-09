import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [rants, setRants] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/blog').then((response) => {
        setRants(response.data)
      })
  }, [])
      
  return (
    <main>
      {rants.map((rant) => {
        return (
          <div>
            <h3>{rant.title}</h3>
            <img src={rant.image} alt={rant.title} />
            <p>{rant.date}</p>
            <p>{rant.content}</p>
          </div>
        )
      })}
    </main>
  )
}

export default App;
