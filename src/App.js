import React from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';
import AuthRoute from './utils/AuthRoute';
import TopBar from './components/TopBar';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Single from './pages/Single';
import About from './pages/About';
import Login from './pages/Login';
import Write from './pages/Write';
import Home from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

function App() {
  return (
    <Router>
      <TopBar />
      <div>
        <ToastContainer />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/post/:slug' component={Single} />
          <ProtectedRoute path='/write' component={Write} />
          <AuthRoute path='/auth/login' component={Login} />
          <ProtectedRoute path='/category' component={Category} />
          <AuthRoute path='/users/register' component={Register} />
          <ProtectedRoute path='/account/settings' component={Settings} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
