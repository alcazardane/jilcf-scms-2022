import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import '../../styles/login.css'

/**
 * ! ERROR
 * ! Can't access the login form values
 * 
 * ? HOW IT SHOULD WORK
 * ? Must be able to get the user's input values and compare it to the records value
 * ? After a successful login, users will be redirected to their proper windows
 * ? After a successful login, users will be signed in.
 * ? When a signed in user attempted to access the login page, the user will be redirected back to the homepage
 */
 async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


export default function Login({ setToken }){
    const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}