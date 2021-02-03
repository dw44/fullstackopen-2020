import React, { useState } from 'react';
import './components.css';

// updated for 5.7 to include blog details
const Blog = ({ blog, addLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetailVisibility = () => setShowDetails(!showDetails);

  const handleLike = async () => {
    await addLike(blog.id);
    setLikes(likes + 1);
  };

  return (
    <div className="blog-display">
      <h4>
        {blog.title}
        {' '}
        --
        {' '}
        {blog.author}
      </h4>
      <div style={{ disply: showDetails ? 'block' : 'none' }}>
        <button
          style={{ margin: '10px 0' }}
          onClick={toggleDetailVisibility}
          className="toggleDisplayBtn"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <div
          style={{ display: showDetails ? '' : 'none' }}
          className="blogDetails"
        >
          <p className="blogURL">{`URL: ${blog.url}`}</p>
          <p className="likesCount">
            {`Likes: ${likes}`}
            {'  '}
            <button className="likeButton" onClick={handleLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          <button className="delete-blog" onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
