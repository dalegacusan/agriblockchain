import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from '../pages/LandingPage/LandingPage';
import FarmersList from '../pages/FarmersList/FarmersList';
import Login from '../pages/LoginRegister/Login/LoginDialog';
import Register from '../pages/LoginRegister/Register/Register';
import Profile from '../pages/Profile/Profile';
import CreateProgram from '../pages/CreateProgram/CreateProgram';
import Header from '../global/Header/Header';
import { RegisterDialogProvider } from '../global/Contexts/RegisterDialogContext';
import { LoginDialogProvider } from '../global/Contexts/LoginDialogContext';
import RegisterDialog from '../pages/LoginRegister/Register/RegisterDialog';
import LoginDialog from '../pages/LoginRegister/Login/LoginDialog';

function App() {

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
        <LoginDialogProvider>
          <RegisterDialogProvider>
            <Header />
            <RegisterDialog />
            <LoginDialog />
          </RegisterDialogProvider>
          <Switch>
            {/* Screen 002 - Menu Items */}
            {/* Screen 001 */}
            <Route exact path='/' render={() => <LandingPage />} />

            <Route exact path='/farmers' render={() => <FarmersList />} />

            {/* Screen 003 */}
            {/* <Route exact path='/login' render={() => <Login />} /> */}

            {/* Screen 004 */}
            <Route exact path='/register/:userType' render={() => <Register />} />

            {/* Screen 005 */}
            <Route exact path='/profile' render={() => <Profile />} />

            {/* Screen 006 */}
            {/* Screen 007 */}

            {/* Screen 008 */}
            <Route exact path='/program/create' render={() =>  <CreateProgram />} />
          </Switch>
        </LoginDialogProvider>
      </Router>
    </div>
  );
}

export default App;
