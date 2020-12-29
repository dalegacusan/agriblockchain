import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from '../../components/Header/Header';
// CSS
import './App.css';
// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
// Contexts
import { RegisterDialogProvider } from '../../contexts/RegisterDialogContext';
import { LoginDialogProvider } from '../../contexts/LoginDialogContext';
// Pages
import LandingPage from '../Landing/Landing';
import AboutPage from '../About/AboutPage';
import ProgramPage from '../Programs/ProgramPage';
import FarmersList from '../FarmersList/FarmersList';
import Register from '../LoginRegister/Register/Register';
import Profile from '../Profile/Profile';
import Programs from '../Programs/Programs';
import CreateProgram from '../Programs/CreateProgram/CreateProgram';
import RegisterDialog from '../LoginRegister/Register/RegisterDialog';
import LoginDialog from '../LoginRegister/Login/LoginDialog';

function App() {

  return (
    <div className="App">

      <CssBaseline />
      {
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
              <Route exact path='/programs' render={() => <Programs />} />
              {/* Screen 008 */}
              <Route exact path='/program/create' render={() => <CreateProgram />} />
              {/* Screen 009 */}
              <Route exact path='/program/:programId' render={() => <ProgramPage />} />

              {/* Screen 010 */}
              <Route exact path='/about' render={() => <AboutPage />} />
            </Switch>
          </LoginDialogProvider>
        </Router>
      }

    </div>
  );
}

export default App;
