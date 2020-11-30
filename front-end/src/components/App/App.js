import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LandingPage from "../LandingPage/LandingPage";
import Farmers from "../Farmers/Farmers";
import FarmersList from "../Farmers/FarmersList";

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/farmers' component={FarmersList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
