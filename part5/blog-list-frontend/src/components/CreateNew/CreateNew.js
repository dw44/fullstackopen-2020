/* eslint-disable react/forbid-prop-types */
// module created earlier but covers 5.6
import React, { useState } from 'react';
// added for 5.11
import PropTypes from 'prop-types';

import classes from './CreateNew.module.css';

// added for 5.3
const CreateNew = ({ submitBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  // new submit handler for 5.16
  const submitNew = (event) => {
    submitBlog({
      author, title, url,
    });
    event.preventDefault();
    setTitle('');
    setAuthor('');
    setURL('');
  };

  return (
    <form className={[classes.Form, 'form'].join(' ')} onSubmit={submitNew}>
      <h1>Create New Entry</h1>
      <div>
        Title:&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="title-inp"
        />
      </div>
      <div>
        Author:&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          id="author-inp"
        />
      </div>
      <div>
        URL:&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          onChange={(e) => setURL(e.target.value)}
          value={url}
          id="url-inp"
        />
      </div>
      <button id="submit-new" type="submit">Create New</button>
    </form>
  );
};

// added for 5.11
CreateNew.propTypes = {
  submitBlog: PropTypes.func.isRequired,
};

export default CreateNew;
