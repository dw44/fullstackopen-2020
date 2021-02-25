import React, { useState } from 'react';

const CreateNew = ({ handleSubmit }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();
    handleSubmit({ author, title, url });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={createBlog} className="new-blog-form">
      <div>
        Title:
        <input
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      </div>
      <div>
        Author:
        <input
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
        />
      </div>
      <div>
        URL:
        <input
          onChange={({ target }) => setUrl(target.value)}
          value={url}
        />
      </div>
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateNew;
