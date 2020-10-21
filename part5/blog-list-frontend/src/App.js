import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm/LoginForm';
import SignOut from './components/SignOut/SignOut';
import CreateNew from './components/CreateNew/CreateNew';
import BlogList from './components/BlogList/BlogList';
import Notification from './components/Notification/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const [notification, setNotification] = useState([null, null]);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );  
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  // added for 5.4
  const handleNotification = (message, type='success') => {
    // type defaults to success unless error is explicitly specified 
    setNotification([message, type]);
    setTimeout(() => setNotification([null, null]), 4000);
  }

  // added for 5.1
  // refactored for 5.4
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      handleNotification(
        `Successfully logged in as ${ user.name }`
      );
    } catch (error) {
      setUsername('');
      setPassword('');
      handleNotification(
        'Incorrect username or password',
        'error'
      );
    }
  }

  // refactored to include notifications for 5.4
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    blogService.setToken('');
    handleNotification(
      'Successfully logged out'
    );
  }

  // refactored to include notifications for 5.4
  const submitNewBlog = async event => {
    event.preventDefault();
    try {
      const response = await blogService.createNew({
        author,
        title,
        url,
      });
      setBlogs([...blogs, response]);
      handleNotification(
        `A new blog - ${ response.title }, by ${ response.author } - has been added`,
      );
      setTitle('');
      setAuthor('');
      setURL('');
    } catch (error) {
      handleNotification(
        'Could not add blog entry. Verify that you\'re logged in and all fields are filled out!',
        'error'
      );
      setTitle('');
      setAuthor('');
      setURL('');
    }
  }

  // added for 5.2
  const loggedInDisplay = () => (
    <div>
      <SignOut user={ user } signOut={ handleLogout } />
      <CreateNew 
        submit={ submitNewBlog }
        title={ title }
        setTitle={ setTitle }
        author={ author }
        setAuthor={ setAuthor }
        url={ url }
        setURL={ setURL }
      />
      <BlogList blogs={ blogs } />
    </div>
  );

  // refactored to include notifications for 5.4
  return (
    <div className="App">
      {notification[0] ? 
        <Notification message={ notification[0] } type={ notification[1] } /> :
        null      
      }
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