import React, { useState } from 'react';
import classes from './Blog.module.css';

// updated for 5.7
const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(true);
  const toggleShowDetail = () => setShowDetail(!showDetail);

  return (
    <div className={classes.BlogDiv}>
      {blog.title}&nbsp;&nbsp; - 
      <span className={classes.author}>&nbsp;&nbsp;{blog.author}</span>
      <button onClick={ toggleShowDetail } className={ classes.ShowDetailBtn }>
        { showDetail ? 'Hide Details' : 'Show Details'}
      </button>
      <div className={ classes.Details } style={ showDetail ? null : { display: 'none' } }>
        <p>Likes: { blog.likes } <button className={classes.Like}>Like</button></p>
        <p>URL: { blog.url }</p>
        <p>Added By: { blog.user.name }</p>
      </div>

   </div>
  );
}



export default Blog;
