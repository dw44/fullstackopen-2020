import React from 'react';

// created for exercise 2.10
const NewEntry = props => {
  return (
    <form onSubmit={ props.submit }>
      <div>
        Name: <input value={ props.nameValue } onChange={ props.nameChange } />
      </div>
      <div>
        Number: <input value={ props.numberValue } onChange={ props.numberChange } />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default NewEntry;