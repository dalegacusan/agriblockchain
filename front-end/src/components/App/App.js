import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LandingPage from "../pages/LandingPage/LandingPage";
import FarmersList from "../pages/FarmersList/FarmersList";

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
