import React from 'react';
import classes from './Blog.module.css';

const Blog = ({ blog }) => (
  <div className={classes.BlogDiv}>
   {blog.title}&nbsp;&nbsp; - 
   <span className={classes.author}>&nbsp;&nbsp;{blog.author}</span>
  </div>
);

export default Blog;
