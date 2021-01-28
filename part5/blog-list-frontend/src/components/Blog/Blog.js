import React, { useState } from 'react';

import Notification from '../Notification/Notification';
import blogServices from '../../services/blogs';
import classes from './Blog.module.css';

// updated for 5.15
const Blog = ({ blog, addLike }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [notification, setNotification] = useState([null, null]);

  const toggleShowDetail = () => setShowDetail(!showDetail);

  // added for 5.10
  const deleteHandler = async () => {
    try {
      await blogServices.deleteBlog(blog.id);
    } catch (error) {
      setNotification(['An error was encountered. You are not authorized to delete this entry.', 'error']);
      setTimeout(() => {
        setNotification([null, null]);
      }, 3000);
    }
  };

  return (
    <div className={classes.BlogDiv}>
      {notification[0]
        ? <Notification message={notification[0]} type={notification[1]} />
        : null}
      {blog.title}
&nbsp;&nbsp; -
      <span className={classes.author}>
        {blog.author}
      </span>
      <button onClick={toggleShowDetail} className={[classes.ShowDetailBtn, 'toggleDisplayBtn'].join(' ')}>
        { showDetail ? 'Hide Details' : 'Show Details'}
      </button>
      <div className={[classes.Details, 'blogDetails'].join(' ')} style={showDetail ? null : { display: 'none' }}>
        <p className="likesCount">
          Likes:
          { blog.likes }
          {' '}
          <button onClick={() => addLike(blog.id, blog.likes)} className={[classes.Like, 'likeButton'].join(' ')}>Like</button>
        </p>
        <p className="blogURL">
          URL:
          { blog.url }
        </p>
        <p>
          Added By:
          { blog.user.name }
        </p>
      </div>
      <button onClick={deleteHandler}>Delete Entry</button>
    </div>
  );
};

export default Blog;
