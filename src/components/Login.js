import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {loginUser, registerUser} from './ajaxHelperFuncs'


const Login = ({match, setToken, history}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <>
        <h1>Log In</h1>
        <form 
        onSubmit={ async (event) => {
            event.preventDefault();
            
            if (match.url === '/register') {
                // Registers the user if password and confirm password match
                await registerUser(username, password, confirmPassword);

                // takes the user to the login page so that they can login
                history.push('/login')
            }
            
            if (match.url === '/login') {
                // logs the user in if everything is correct and
                // add the token to local storage and updates state
                const errorResult = await loginUser(username, password, setToken);

                // takes user to their login page
                if (errorResult === null) {
                    history.push('/profile')
                }
            }
        }}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                className="form-control"
                id="username"
                type='text' 
                placeholder='username'
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value)        
                }}></input> {/* username */}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                className="form-control"
                id="password"
                type='text' 
                placeholder='password'
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value)
                }}></input> {/* password */}
            </div>
                {match.url === "/register"?
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input 
                        className="form-control"
                        id="confirm-password"
                        type='text' 
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value)
                        }}></input>
                    </div>
                    :
                    null
                }

                <button type="submit" className="btn btn-primary">Submit</button>
                {
                    match.url === '/register'?
                        <Link to='/login'>Already have an account?</Link>
                        :
                        <Link to='/register'>Don't have an account?</Link>
                }
        </form>
        </>
    )
}

export default Login;