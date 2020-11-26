import React, { useState, useEffect } from "react";
import Farmers from "../Farmers/Farmers";
import axios from 'axios';
import './App.css';

function App() {

  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    axios.get('/api/farmers')
      .then(res => {
        setFarmers([...farmers, ...res.data]);
      });
  }, []);

  return (
    <div className="App">
      {
        farmers
          ?
          <div className="farmerBox">
            <Farmers farmers={farmers} />
          </div>
          : null
      }
    </div>
  );
}

export default App;
