import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import CreateNew from './components/CreateNew';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { setNotification } from './reducers/notificationReducer';
// added for 7.10
import {
  initializeBlogList, addBlog, likeBlog, removeBlog,
} from './reducers/blogReducer';

// modified for 7.9 to get state/action creator for notification from redux
const App = ({
  notification, setNotification, blogs, initializeBlogList, addBlog, removeBlog,
}) => {
  const [user, setUser] = useState(null);
  const [updatedLike, setUpdatedLike] = useState(false);
  // refactored to use action creator for 7.10
  useEffect(() => {
    initializeBlogList();
  }, []);

  // rerenders sorted list if new likes are added
  useEffect(() => {
    initializeBlogList();
  }, [updatedLike]);

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

  const newBlogRef = useRef();

  const handleLogout = () => {
    setUser('');
    window.localStorage.clear();
    setNotification(['Logged Out Successfully', 1], 5000);
  };

  // updated for 7.9 to use new action creator for notifications
  // updated for 7.10 to fetch initial list and add blogs using redux
  const submitBlog = async (blogObject) => {
    try {
      await blogService.createNew(blogObject)
        .then((res) => {
          addBlog(res.data);
        });

      newBlogRef.current.toggleVisible();
      // added for 5.4
      setNotification(['Blog Submitted Successfully', 1], 5000);
    } catch (error) {
      setNotification(['Failed to Submit Blog', 0], 5000);
      newBlogRef.current.toggleVisible();
    }
  };

  // updated for 7.11 to handle like state updats through redux
  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.addLike(id, newBlog);
    // this part is to be replaced
    likeBlog(cloneDeep(updatedBlog));
    // this part is NOT
    setUpdatedLike(!updatedLike);
    return updatedBlog;
  };

  // updated for 7.9 to use new action creator for notifications
  // updated for 7.11 to use new action creator to remove deleted blogs from state
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    const final = window.confirm('Delete this Blog?');
    if (final) {
      try {
        await blogService.deleteBlog(id);
        removeBlog(id);
        setNotification(['Blog Deleted Successfully', 1], 5000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setNotification(
            ['You are not authorized to delete this blog',
              0],
            5000,
          );
        } else {
          setNotification(
            ['Unable to delete this blog',
              0],
            5000,
          );
        }
      }
    }
  };

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
        : <LoginForm setNotification={setNotification} setUser={setUser} />}
    </div>
  );
};

// added for 7.9
// updated for 7.10
const mapStateToProps = (state) => {
  const { blogs, notification } = state;
  const sortedBlogs = blogs.sort((b1, b2) => ((b1.likes > b2.likes) ? -1 : 1));
  return { blogs: sortedBlogs, notification };
};

// added for 7.9
// updated for 7.10 / 7.11
const mapDispatchToProps = {
  setNotification,
  initializeBlogList,
  addBlog,
  removeBlog,
};

// added for 7.9
const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ConnectedApp;
