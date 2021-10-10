import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { isLoggedIn, logOut, makeHeaders } from './components/helperFuncs';
import {getPosts} from './components/ajaxHelperFuncs';

import {Login, Posts, Home, Profile, MakePost, SinglePost} from './components/index'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [headers, setHeaders] = useState({'Content-Type': 'application/json'});
  const [loggedIn, setLoggedIn] = useState(isLoggedIn(token));
  const [selectedPost, setSelectedPost] = useState({});
  const [posts, setPosts] = useState([]);

  

  useEffect(() => {
   setLoggedIn(isLoggedIn(token));
   setHeaders(makeHeaders(token));

  }, [token])

  useEffect(async() => {
    await getPosts(headers).then(result => setPosts(result));
  }, [headers])
  
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
          <Route exact path='/posts' render={(routeProps) => <Posts {...routeProps} headers={headers} loggedIn={loggedIn} setSelectedPost={setSelectedPost} posts={posts}/>}></Route>
          <Route path='/profile' render={(routeProps) => <Profile {...routeProps} headers={headers}/>}></Route>
          <Route path='/posts/add' render={(routeProps) => <MakePost {...routeProps} headers={headers} setPosts={setPosts}/>}></Route>
          <Route path='/posts/:postId' render={(routeProps) => <SinglePost {...routeProps} selectedPost={selectedPost} setSelectedPost={setSelectedPost} posts={posts} headers={headers} setPosts={setPosts}/>}></Route>
          <Route exact path='/posts/:postId/edit' render={(routeProps) => <MakePost {...routeProps} headers={headers} setPosts={setPosts} selectedPost={selectedPost}/>}></Route>
        </div>
      </div>
    </Router>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);