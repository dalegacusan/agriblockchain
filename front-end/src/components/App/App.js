import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from '../pages/LandingPage/LandingPage';
import FarmersList from '../pages/FarmersList/FarmersList';
import Login from '../pages/LoginRegister/Login/Login';
import Register from '../pages/LoginRegister/Register/Register';
import Profile from '../pages/Profile/Profile';
import Header from '../global/Header/Header';

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/farmers' component={FarmersList} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
