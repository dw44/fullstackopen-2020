import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
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

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
      console.log(user);
    } catch (error) {
      alert('Invalid Username or Password');
    }
  }

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
        <BlogList blogs={ blogs } />
      }      
    </div>
  );
}

export default App;