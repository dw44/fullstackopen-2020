import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import DisplayCountry from './components/DisplayCountry';

const App = () => {
  const [ countries, setCounties ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');

  const handleChangeSearch = event => {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(results => setCounties(results.data));
  }, []);

  const searchResults = searchQuery.trim() === '' 
    ? []
    : countries
        .filter(country => country.name.toLowerCase().includes(searchQuery));

  const display = searchResults.length > 10 
    ? <h3>Too many matches. Specify another filter</h3> 
    : searchResults.length > 1 
      ? searchResults.map(result => <p key={ result.topLevelDomain[0] }>{ result.name }</p>)
      :  searchResults.length > 0 
        ? <DisplayCountry country={ searchResults[0] } />
        : <h3>No matches found</h3>;
    
  return (
    <div className="App">
      <Search handleChange={ handleChangeSearch } searchQuery={ searchQuery } />
      <div>
        { display }
      </div>
    </div>
  );
}

export default App;
