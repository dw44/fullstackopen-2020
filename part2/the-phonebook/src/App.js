import React, { useState } from 'react';

import Filter from './components/Filter';
import NewEntry from './components/NewEntry';
import Display from './components/Display';

// initialized for exercise 2.6
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '072-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterValue, setFilterValue ] = useState('');

  // refactored for exercise 2.8
  const handleChangeName = event => setNewName(event.target.value);

  // added for exercise 2.8
  const handleChangeNumber = event => setNewNumber(event.target.value);

  // added for exercise 2.9
  const handleChangeFilter = event => setFilterValue(event.target.value);


  // refactored for exercise 2.7
  const handleSubmit = event => {
    event.preventDefault();

    // checks if a person entry for newName already exists
    const nameExists = persons.filter(person => person.name === newName.trim()).length > 0
    const numberExists = persons.filter(person => person.number === newNumber.trim()).length > 0;

    // the if statement ensures that the name field isn't empty or whitespace
    if (newName.trim().length > 0 && newNumber.trim().length > 0) {
      if (nameExists || numberExists) {
        // an error is displayed and the form reset if the person, number, or both are already added 
        if (nameExists || (nameExists && numberExists)){
          alert(`${newName.trim()} is already added to the phonebook`);
        } else if (numberExists && !nameExists) {
          alert(`${newNumber.trim()} is already added to the phonebook`);
        }

        // Reset form inputs
        setNewName('');
        setNewNumber('');
      } else {
        // if person isn't already added, it is added to "persons" 
        const personObject = {
          name: newName.trim(),
          number: newNumber.trim()
        };

        setPersons(persons.concat(personObject));
        setNewName('');
        setNewNumber('');
      }
    } else {
      // an error is displayed and the form reset in case name, number, or both fields are empty
      alert('Please enter a valid name and number. Neither field can be empty');
      setNewName('');
      setNewNumber('');
    }
  }

  // display all names when filter input is empty 
  const displayNames = filterValue.trim() === '' 
    ? persons.map(person => 
        <li key={ Math.floor(Math.random() * 1000000000)}>{ person.name } ( {person.number} )</li>
      ) 
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())).map(person => 
        <li key={ Math.floor(Math.random() * 1000000000)}>{ person.name } ( {person.number} )</li>
      );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Filter handleChange={ handleChangeFilter } />
      <NewEntry 
        submit={ handleSubmit }  
        nameValue={ newName }
        nameChange={ handleChangeName }
        numberValue={ newNumber }
        numberChange={ handleChangeNumber }
      />
      <Display displayNames={ displayNames } />
    </div>
  );
}

export default App;
