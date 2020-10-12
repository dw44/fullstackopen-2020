import React from 'react';

// created for exercise 2.10
const Filter = ({ handleChange }) => (
  <div>
    Filter by Name:
    {' '}
    <input type="text" onChange={handleChange} />
  </div>
);

export default Filter;
