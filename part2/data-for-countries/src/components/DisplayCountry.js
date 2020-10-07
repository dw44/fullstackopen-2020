import React from 'react';

import Weather from './Weather';

const DisplayCountry = props => (
  <div>
    <h1>{ props.country.name }</h1>
    <p>Capital: {props.country.capital }</p>
    <p>Population: { props.country.population }</p>
    <h2>Languages:</h2>
    <ul>
      { props.country.languages.map(lang => <li key={ lang.iso639_2 }>{ lang.name }</li>)}
    </ul>
    <img 
      src={ props.country.flag } 
      alt={ props.country.name } 
      width="200px"
      style={{ border: "1px solid #000" }}
    />
    <Weather city={ props.country.capital } country={ props.country.name } />
  </div>
);

export default DisplayCountry;