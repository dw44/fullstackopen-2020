import React from 'react';

const Search = ({ handleChange, searchQuery }) => (
  <input 
    type="text" 
    placeholder="Search" 
    onChange={ handleChange } 
    value={ searchQuery } 
  />
);

export default Search;