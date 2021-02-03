import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, addLike, handleDelete }) => (
  <div id="blog-list">
    <h2>Blogs</h2>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        addLike={addLike}
        handleDelete={handleDelete}
      />
    ))}
  </div>
);

export default BlogList;
