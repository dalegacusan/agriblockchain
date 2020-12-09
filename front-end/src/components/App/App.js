import React, { useState, useEffect } from "react";
import LoadingScreen from '../pages/LoadingScreen/LoadingScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from '../pages/LandingPage/LandingPage';
import FarmersList from '../pages/FarmersList/FarmersList';
import Register from '../pages/LoginRegister/Register/Register';
import Profile from '../pages/Profile/Profile';
import Programs from '../pages/Programs/Programs';
import CreateProgram from '../pages/Programs/CreateProgram/CreateProgram';
import Header from '../global/Header/Header';
import { RegisterDialogProvider } from '../global/Contexts/RegisterDialogContext';
import { LoginDialogProvider } from '../global/Contexts/LoginDialogContext';
import RegisterDialog from '../pages/LoginRegister/Register/RegisterDialog';
import LoginDialog from '../pages/LoginRegister/Login/LoginDialog';
const axios = require('axios');

function App() {

  const [programs, setPrograms] = useState([]);

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

  useEffect(() => {
    axios.get('/api/programs')
      .then((result) => {
        setPrograms(result);
      });
  }, []);

  return (
    <div className="App">

      <CssBaseline />
      {
        programs.length !== 0
          ?
          <Router>
            <LoginDialogProvider>
              <RegisterDialogProvider>
                <Header />
                <RegisterDialog />
                <LoginDialog />
              </RegisterDialogProvider>
              <Switch>
                {/* Screen 002 - Menu Items */}
                {/* Screen 001 */}
                <Route exact path='/' render={() => <LandingPage programs={programs.data} />} />

                <Route exact path='/farmers' render={() => <FarmersList />} />

                {/* Screen 003 */}
                {/* <Route exact path='/login' render={() => <Login />} /> */}

                {/* Screen 004 */}
                <Route exact path='/register/:userType' render={() => <Register />} />

                {/* Screen 005 */}
                <Route exact path='/profile' render={() => <Profile />} />

                {/* Screen 006 */}
                {/* Screen 007 */}
                <Route exact path='/programs' render={() => <Programs />} />
                {/* Screen 008 */}
                <Route exact path='/program/create' render={() => <CreateProgram />} />
              </Switch>
            </LoginDialogProvider>
          </Router>
          :
          <LoadingScreen />
      }

    </div>
  );
}

export default App;
