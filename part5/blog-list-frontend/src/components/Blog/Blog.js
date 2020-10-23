import React, { useState } from 'react';
import blogServices from '../../services/blogs';
import classes from './Blog.module.css';

// updated for 5.7
const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const toggleShowDetail = () => setShowDetail(!showDetail);
  
  // added for 5.8
  const newLike = async () => {
    const updated = await blogServices.addLike(blog.id, {
      likes: likes + 1
    });

    if (updated.status === 204) {
      setLikes(likes + 1);
    }
  }

  return (
    <div className={classes.BlogDiv}>
      {blog.title}&nbsp;&nbsp; - 
      <span className={classes.author}>&nbsp;&nbsp;{blog.author}</span>
      <button onClick={ toggleShowDetail } className={ classes.ShowDetailBtn }>
        { showDetail ? 'Hide Details' : 'Show Details'}
      </button>
      <div className={ classes.Details } style={ showDetail ? null : { display: 'none' } }>
        <p>Likes: { likes } <button onClick={ newLike } className={classes.Like}>Like</button></p>
        <p>URL: { blog.url }</p>
        <p>Added By: { blog.user.name }</p>
      </div>

   </div>
  );
}



export default Blog;
