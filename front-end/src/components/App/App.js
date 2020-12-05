import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from '../pages/LandingPage/LandingPage';
import FarmersList from '../pages/FarmersList/FarmersList';
import Login from '../pages/LoginRegister/Login/Login';
import Register from '../pages/LoginRegister/Register/Register';
import Profile from '../pages/Profile/Profile';
import CreateProgram from '../pages/CreateProgram/CreateProgram';
import Header from '../global/Header/Header';

function App() {
  const [currentUser, setCurrentUser] = useState('corporation');

  /*

    // =============================
    //            USERS
    // 
    //      a) ngo
    //      b) corporation
    //      c) individual
    //      d) farmer
    //
    // =============================

  */

  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          {/* Screen 002 - Menu Items */}
          {/* Screen 001 */}
          <Route exact path='/' render={() => <LandingPage currentUser={currentUser} />} />

          <Route exact path='/farmers' render={() => <FarmersList currentUser={currentUser} />} />

          {/* Screen 003 */}
          <Route exact path='/login' render={() => <Login currentUser={currentUser} />} />

          {/* Screen 004 */}
          <Route exact path='/register' render={() => <Register currentUser={currentUser} />} />

          {/* Screen 005 */}
          <Route exact path='/profile' render={() => <Profile currentUser={currentUser} />} />

          {/* Screen 006 */}
          {/* Screen 007 */}

          {/* Screen 008 */}
          <Route exact path='/program/create' render={() => <CreateProgram currentUser={currentUser} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
