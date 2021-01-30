import React from 'react';
import classes from './LoginForm.module.css';

// login-form class added to form for 5.17
const LoginForm = ({
  handleSubmit, username, setUsername, password, setPassword,
}) => (
  <form className={[classes.Form, 'login-form'].join(' ')} onSubmit={handleSubmit}>
    <h1>Sign In</h1>
    <div>
      Username:&nbsp;&nbsp;&nbsp;
      <input
        id="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
    </div>
    <div>
      Password:&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button id="login-button" type="submit">Log In</button>
  </form>
);

export default LoginForm;
