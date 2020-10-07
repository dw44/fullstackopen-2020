import React from 'react';

const SearchResult = ({ country, handleClick }) => (
  <div>
    <p>{ country.name }</p>
    <button onClick={ () => handleClick(country.name) }>Show { country.name }</button>
  </div>

);

export default SearchResult;