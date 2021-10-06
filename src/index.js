import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {Login, Posts} from './components/index'

const App = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, [])
  return (
    <Router>
      <div>
        <div id='navbar'>
          <Link to='/posts'>Posts</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
        <div id='mainsection'>
          <Route path='/login' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
          <Route path='/register' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
          <Route path='/posts' render={(routeProps) => <Posts {...routeProps}/>}></Route>
        </div>
      </div>
    </Router>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);