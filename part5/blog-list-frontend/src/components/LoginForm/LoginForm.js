import React from 'react';
import classes from './LoginForm.module.css';

const LoginForm = ({
  handleSubmit, username, setUsername, password, setPassword,
}) => (
  <form className={classes.Form} onSubmit={handleSubmit}>
    <h1>Sign In</h1>
    <div>
      Username:&nbsp;&nbsp;&nbsp;
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
    </div>
    <div>
      Password:&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit">Log In</button>
  </form>
);

export default LoginForm;
