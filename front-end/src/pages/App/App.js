import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Layout from '../../components/Layout/Layout';
// MaterialUI
// Contexts
import LandingPage from '../Landing/Landing';
// Pages
import AboutPage from '../About/AboutPage';
import ProgramPage from '../Programs/ProgramPage';
import FarmersList from '../FarmersList/FarmersList';
import Register from '../LoginRegister/Register/Register';
import Profile from '../Profile/Profile';
import Programs from '../Programs/Programs';
import CreateProgram from '../Programs/CreateProgram/CreateProgram';
import PageNotFound from '../Error/404/PageNotFound';
// CSS
import './App.css';

function App() {

  return (
    <div className="App">

      <Layout>
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

          {/* Error 404 - Page Not Found */}
          {/* https://stackoverflow.com/questions/32128978/react-router-no-not-found-route */}
          <Route path='*' exact render={() => <PageNotFound />} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
