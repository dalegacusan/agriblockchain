import React from "react";
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

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Router>
        <Switch>
          {/* Screen 002 - Menu Items */}

          {/* Screen 001 */}
          <Route exact path='/' component={LandingPage} />

          <Route exact path='/farmers' component={FarmersList} />

          {/* Screen 003 */}
          <Route exact path='/login' component={Login} />

          {/* Screen 004 */}
          <Route exact path='/register' component={Register} />

          {/* Screen 005 */}
          <Route exact path='/profile' component={Profile} />

          {/* Screen 006 */}
          {/* Screen 007 */}

          {/* Screen 008 */}
          <Route exact path='/createprogram' component={CreateProgram} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
