import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import NewEntry from './components/NewEntry';
import Display from './components/Display';
import personServices from './services/persons';

// initialized for exercise 2.6
const App = () => {
  // refactored for exercise 2.11
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterValue, setFilterValue ] = useState('');

  useEffect(() => {
    personServices
      .getAll()
      .then(results => setPersons(results));
  }, []);

  // refactored for exercise 2.8
  const handleChangeName = event => setNewName(event.target.value);

  // added for exercise 2.8
  const handleChangeNumber = event => setNewNumber(event.target.value);

  // added for exercise 2.9
  const handleChangeFilter = event => setFilterValue(event.target.value);


  // refactored for exercise 2.15
  const handleSubmit = event => {
    event.preventDefault();

    // checks if a person entry for newName already exists
    const nameExists = persons.filter(person => person.name === newName.trim()).length > 0;
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

        // added for 2.15 - new entried now saved to server
        personServices
          .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
          });        
      }
    } else {
      // an error is displayed and the form reset in case name, number, or both fields are empty
      alert('Please enter a valid name and number. Neither field can be empty');
      setNewName('');
      setNewNumber('');
    }
  }

  // added for exercise 2.17
  const handleDelete = id => {
    const confirm = window.confirm('Are you sure you want to delete this entry?');
    if (confirm) {
      personServices
        .deleteEntry(id)
        .then(() => {
          // state changed inside "then" so it's only updated if request succeeds
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  // refactored for 2.17, reformatted to reduce visual clutter 
  const displayNames = filterValue.trim() === '' 
    ? persons.map(person => 
        <li key={ person.id }>
          { person.name } ( { person.number } ) 
          <button onClick = { () => handleDelete(person.id) }>Delete</button>
        </li>
      ) 
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())).map(person => 
        <li key={ person.id }>
          { person.name } ( { person.number } )
          <button onClick = { () => handleDelete(person.id) }>Delete</button>
        </li>
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
