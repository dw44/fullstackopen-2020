// component created for 5.3. also covers 5.6
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
          id="title-inp"
        />
      </div>
      <div>
        Author:
        <input
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
          id="author-inp"
        />
      </div>
      <div>
        URL:
        <input
          onChange={({ target }) => setUrl(target.value)}
          value={url}
          id="url-inp"
        />
      </div>
      <button
        type="submit"
        id="submit-new"
      >
        Submit
      </button>
    </form>
  );
};

// added for 5.11
CreateNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default CreateNew;
