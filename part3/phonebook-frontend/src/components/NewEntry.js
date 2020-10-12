import React from 'react';

// created for exercise 2.10
const NewEntry = ({
  submit, nameValue, nameChange, numberValue, numberChange,
}) => (
  <form onSubmit={submit}>
    <div>
      Name:
      {' '}
      <input value={nameValue} onChange={nameChange} />
    </div>
    <div>
      Number:
      {' '}
      <input value={numberValue} onChange={numberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default NewEntry;
