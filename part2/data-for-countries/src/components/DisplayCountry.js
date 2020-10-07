import React from 'react';

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
      width="300px"
      style={{ border: "1px solid #000" }}
    />
  </div>
);

export default DisplayCountry;