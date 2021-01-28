import React from 'react';
import Blog from '../Blog/Blog';

const BlogList = ({ blogs, addLike }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map((blog) => <Blog key={blog.id} blog={blog} addLike={addLike} />)}

  </div>
);

export default BlogList;
