import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';

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
        .filter(country => country.name.toLowerCase().includes(searchQuery))
        .map(country => <p key={ country.alpha3Code }>{ country.name }</p>);

  const display = searchResults.length > 10 
    ? <h3>Too many matches. Specify another filter</h3> 
    : searchResults.length > 1 
      ? <h3>Between 1 and 10 results</h3>
      :  searchResults.length > 0 
        ? <h3>Exactly 1 result</h3>
        : <h3>0 Results</h3>;
    
  return (
    <div className="App">
      <Search handleChange={ handleChangeSearch } searchQuery={ searchQuery } />
      {/* <div>{ display }</div> */}
      <div>
        { display }
        { searchResults }
      </div>
    </div>
  );
}

export default App;
