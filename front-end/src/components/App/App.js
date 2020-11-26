import React, { useState, useEffect } from "react";
import Farmers from "../Farmers/Farmers";
import axios from 'axios';
import './App.css';

function App() {

  const [farmers, setFarmers] = useState([]);
  const [toggleFarmers, setToggleFarmers] = useState(false);

  useEffect(() => {
    axios.get('/api/farmers')
      .then(res => {
        setFarmers([...farmers, ...res.data]);
      });
  }, []);

  return (
    <div className="App">
      <button type="button" onClick={() => setToggleFarmers(!toggleFarmers)}>View All Farmers</button>
      {
        toggleFarmers
          ?
          <Farmers farmers={farmers} />
          : null
      }
    </div>
  );
}

export default App;
