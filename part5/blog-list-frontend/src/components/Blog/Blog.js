import React, { useState } from 'react';

import Notification from '../Notification/Notification';
import blogServices from '../../services/blogs';
import classes from './Blog.module.css';

// updated for 5.7
const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [notification, setNotification] = useState([null, null]);

  const toggleShowDetail = () => setShowDetail(!showDetail);

  // added for 5.8
  const newLike = async () => {
    const updated = await blogServices.addLike(blog.id, {
      likes: likes + 1,
    });

    if (updated.status === 204) {
      setLikes(likes + 1);
    }
  };

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
      <button onClick={toggleShowDetail} className={classes.ShowDetailBtn}>
        { showDetail ? 'Hide Details' : 'Show Details'}
      </button>
      <div className={[classes.Details, 'blogDetails'].join(' ')} style={showDetail ? null : { display: 'none' }}>
        <p>
          Likes:
          { likes }
          {' '}
          <button onClick={newLike} className={classes.Like}>Like</button>
        </p>
        <p>
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
