import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { isLoggedIn, logOut, makeHeaders } from './components/helperFuncs';
import {getPosts, getUser} from './components/ajaxHelperFuncs';

// all of the main components used in the api
import {Login, Posts, Home, Profile, MakePost, SinglePost} from './components/index'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // defaults off of users localStorage
  const [headers, setHeaders] = useState({'Content-Type': 'application/json'}); // default header object
  const [loggedIn, setLoggedIn] = useState(isLoggedIn(token)); // boolean
  const [selectedPost, setSelectedPost] = useState({}); // holds the current post that we need elsewhere
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');

  
  // updates loggedIn and headers when the value of token changes
  // This insures that they will be updated at the right time
  useEffect(() => {
   setLoggedIn(isLoggedIn(token));
   setHeaders(makeHeaders(token));

  }, [token])

  // updates Posts whenever headers is updated to display the right info to the user
  // updates username after headers is updated to make sure it is a valid username and not null
  useEffect(async() => {
    await getPosts(headers).then(result => setPosts(result));

    const result = await getUser(headers);
    if (result.data) setUsername(result.data.username); 
  }, [headers])
  
  return (
    <Router>
      <div>
        <nav id='navbar' className='nav'>
          <h3>Stranger's Things</h3>
          <Link className='navbar-brand' to='/'>Home</Link>
          <Link className='navbar-brand' to='/posts'>Posts</Link>
          {isLoggedIn(token)? // Only displays these if the user is logged in
          <>
          <Link className='navbar-brand' to='/profile'>Profile</Link>
          <Link className='navbar-brand' to='/login'
          onClick={() => {
            logOut(setToken)
            setHeaders(makeHeaders(token));
          }}>Logout</Link>
          </>
          :
          <Link className='navbar-brand' to='/login'>Login</Link>
          }
        </nav>
        <div id='mainsection'>
          <Route exact path='/' render={(routeProps) => <Home {...routeProps} headers={headers}/>}></Route>
          <Route path='/login' render={(routeProps) => <Login {...routeProps} setToken={setToken} setUsername={setUsername} username={username}/>}></Route>
          <Route path='/register' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
          <Route exact path='/posts' render={(routeProps) => <Posts {...routeProps} headers={headers} loggedIn={loggedIn} setSelectedPost={setSelectedPost} posts={posts}/>}></Route>
          <Route path='/profile' render={(routeProps) => <Profile {...routeProps} headers={headers} setSelectedPost={setSelectedPost} posts={posts} username={username}/>}></Route>
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