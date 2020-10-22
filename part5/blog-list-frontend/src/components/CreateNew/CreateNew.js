// module created earlier but covers 5.6
import React from 'react';
import classes from './CreateNew.module.css';

// added for 5.3
const CreateNew = ({ submit, title, setTitle, author, setAuthor, url, setURL  }) => (
  <form className={ classes.Form } onSubmit={ submit }>
    <h1>Create New Entry</h1>
    <div>Title:&nbsp;&nbsp;&nbsp; 
      <input 
        type="text" 
        onChange={e => setTitle(e.target.value)} 
        value={ title } 
      />
    </div>
    <div>Author:&nbsp;&nbsp;&nbsp; 
      <input 
        type="text" 
        onChange={e => setAuthor(e.target.value)} 
        value={ author } 
      />
    </div>
    <div>URL:&nbsp;&nbsp;&nbsp; 
      <input 
        type="text" 
        onChange={e => setURL(e.target.value)} 
        value={ url } 
      />
    </div>
    <button type="submit">Create New</button>
  </form>
);

export default CreateNew;