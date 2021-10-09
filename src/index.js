import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { isLoggedIn, logOut, makeHeaders } from './components/helperFuncs';
import {Login, Posts, Home, Profile} from './components/index'

const App = () => {
  const [token, setToken] = useState(null);
  const [headers, setHeaders] = useState(null);
  
  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setToken(localToken);
      setHeaders(makeHeaders());
    }
  }, [])
  return (
    <Router>
      <div>
        <div id='navbar'>
          <h3>Stranger's Things</h3>
          <Link to='/'>Home</Link>
          <Link to='/posts'>Posts</Link>
          {isLoggedIn(token)?
          <>
          <Link to='/profile'>Profile</Link>
          <Link to='/login'
          onClick={() => {
            logOut(setToken)
            setHeaders(makeHeaders(token));
          }}>Logout</Link>
          </>
          :
          <Link to='/login'>Login</Link>
          }
          
          {/*<Link to='/register'>Register</Link>*/}
        </div>
        <div id='mainsection'>
          <Route exact path='/' render={(routeProps) => <Home {...routeProps} headers={headers}/>}></Route>
          <Route path='/login' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
          <Route path='/register' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
          <Route path='/posts' render={(routeProps) => <Posts {...routeProps}/>}></Route>
          <Route path='/profile' render={(routeProps) => <Profile {...routeProps} token={token}/>}></Route>
        </div>
      </div>
    </Router>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);