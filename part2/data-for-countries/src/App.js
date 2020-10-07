import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import SearchResult from './components/SearchResult';
import DisplayCountry from './components/DisplayCountry';


const App = () => {
  const [ countries, setCounties ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  // added for 2.13. tracks country selected from search results
  const [ current, setCurrent ] = useState([]);

  // refactored for 2.13 to reset setCurrent when search parameters are changed
  const handleChangeSearch = event => {
    setSearchQuery(event.target.value);
    setCurrent([]);
  }

  // added for 2.13
  const handleClickShowCountry = name => {
    const show = countries.filter(country => country.name === name);
    setCurrent(current.concat(show));
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(results => setCounties(results.data));
  }, []);

  // as search query is expanded, all matching countries are added to an array
  const searchResults = searchQuery.trim() === '' 
    ? []
    : countries
        .filter(country => country.name.toLowerCase().includes(searchQuery));

  /*
  If search has >10 matches, a message to that effect is displayed
  if number of matches is 2-10, a list is shown and when one is selected, 
  it's stored in the state variable "current" and displayed
  if there's only 1 match, that country is displayed
  */ 
  const mainDisplay = searchResults.length > 10 
    ? <h3>Too many matches. Specify another filter</h3> 
    : searchResults.length > 1 
      ? current.length > 0 
          ? <DisplayCountry country={ current[0] } /> 
          : searchResults.map(result => <SearchResult key={ result.numericCode } country={ result } handleClick={handleClickShowCountry} />)
      :  searchResults.length > 0 
        ? <DisplayCountry country={ searchResults[0] } />
        : <p>No results found</p>;
    
  return (
    <div className="App">
      <Search handleChange={ handleChangeSearch } searchQuery={ searchQuery } />
      { mainDisplay }
    </div>
  );
}

export default App;
