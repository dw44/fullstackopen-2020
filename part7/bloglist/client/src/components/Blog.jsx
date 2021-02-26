import { useState } from 'react';

const Blog = ({ blog, addLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailVisibility = () => setShowDetails(!showDetails);

  // updated for 7.11
  const handleLike = () => {
    addLike(blog.id);
  };

  return (
    <div>
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
        <div style={{ display: showDetails ? '' : 'none' }}>
          <p>{`URL: ${blog.url}`}</p>
          <p>
            {`Likes: ${blog.likes}`}
            {'  '}
            <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
