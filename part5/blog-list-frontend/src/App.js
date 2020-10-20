import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm/LoginForm';
import SignOut from './components/SignOut/SignOut';
import BlogList from './components/BlogList/BlogList';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );  
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // added for 5.1
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    } catch (error) {
      alert('Invalid Username or Password');
      setUsername('');
      setPassword('');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  }

  // added for 5.2
  const loggedInDisplay = () => (
    <div>
      <SignOut user={ user } signOut={ handleLogout } />
      <BlogList blogs={ blogs } />
    </div>
  );

  return (
    <div className="App">
      {user === null ? 
        <LoginForm
          handleSubmit={ handleLogin }
          username={ username }
          setUsername={ setUsername }
          password={ password }
          setPassword={ setPassword }
        /> :
        loggedInDisplay()
      }      
    </div>
  );
}

export default App;