import React from 'react';

// created for exercise 2.10
const Display = ({ displayNames }) => (
  <section>
    <h2>Numbers</h2>
    <ul>
      { displayNames }
    </ul>
  </section>
);

export default Display;
