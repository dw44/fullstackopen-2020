import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ setUser, handleNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user),
      );
      setUser(user);
      handleNotification(
        `${user.name} Successfully Logged In`,
        1,
      );
      blogService.setToken(user.token);
    } catch (error) {
      handleNotification(
        'Invalid Username or Password',
        0,
      );
      setUser(null);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form>
      <div>
        Username:&nbsp;&nbsp;
        <input
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>
      <div>
        Password:&nbsp;&nbsp;&nbsp;
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>
      <button onClick={handleLogin}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
