import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Topbar from './components/TopBar';
import ProtectedRoute from './utils/ProtectedRoute';
import AuthRoute from './utils/AuthRoute';
import BackToTop from './components/BackToTop';
import {
  About,
  Category,
  Home,
  Login,
  NotFound,
  Register,
  Settings,
  Single,
  Write,
} from './pages';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Topbar />
      <BackToTop />
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
