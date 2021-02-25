import React, { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import CreateNew from './components/CreateNew';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // added for 5.1. Authenticated user saved here
  const [user, setUser] = useState(null);
  // added for 5.4
  const [notification, setNotification] = useState([null, 0]);
  const [updatedLike, setUpdatedLike] = useState(false);

  // updated for 5.9 to sort blogs by likes
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((b1, b2) => ((b1.likes > b2.likes) ? -1 : 1)))
      .then((blogs) => setBlogs(blogs));
  }, []);

  // added for 5.2
  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    } else {
      setUser(null);
    }
  }, []);

  // added for 5.5
  const newBlogRef = useRef();

  // helper for 5.4
  const handleNotification = (text, type) => {
    setNotification([text, type]);
    setTimeout(() => {
      setNotification([null, null]);
    }, 5000);
  };

  // added for 5.2
  const handleLogout = () => {
    setUser('');
    window.localStorage.clear();
    handleNotification('Logged Out Successfully', 1);
  };

  // added for 5.3
  // updated for 5.5 to close form after submit button is clicked
  const submitBlog = async (blogObject) => {
    try {
      await blogService.createNew(blogObject)
        .then((res) => {
          setBlogs([...blogs, res.data]);
        });

      newBlogRef.current.toggleVisible();
      // added for 5.4
      handleNotification('Blog Submitted Successfully', 1);
    } catch (error) {
      handleNotification('Failed to Submit Blog', 0);
      newBlogRef.current.toggleVisible();
    }
  };

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.addLike(id, newBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
    setUpdatedLike(!updatedLike);
    return updatedBlog;
  };

  // added for 5.10
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    const final = window.confirm('Delete this Blog?');
    if (final) {
      try {
        await blogService.deleteBlog(id);
        handleNotification('Blog Deleted Successfully');
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (error) {
        if (error.response.status === 401) {
          handleNotification(
            'You are not authorized to delete this blog',
            0,
          );
        } else {
          handleNotification(
            'Unable to delete this blog',
            0,
          );
        }
      }
    }
  };

  // add new blog form now uses togglable component starting from 5.5
  return (
    <div className="App">
      {notification[0] ? <Notification text={notification[0]} type={notification[1]} /> : null}
      {user
        ? (
          <div>
            <h1>
              {user.name}
              {' '}
              Logged In
            </h1>
            <button onClick={handleLogout}>Log Out</button>
            <Togglable ref={newBlogRef} buttonLabel="Create New">
              <CreateNew handleSubmit={submitBlog} />
            </Togglable>
            <BlogList
              blogs={blogs}
              addLike={handleLike}
              handleDelete={handleDelete}
            />
          </div>
        )
        : <LoginForm handleNotification={handleNotification} setUser={setUser} />}
    </div>
  );
};

export default App;
