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


  // completely rewritten for 2.18
  const handleSubmit = event => {
    event.preventDefault();

    // confirm that name/number fields are not empty
    if (newName.trim().length > 0 && newNumber.trim().length > 0) {
      // checks if a person entry for newName already exists
      const nameExists = persons.filter(person => person.name === newName.trim()).length > 0;

      if (nameExists) {
        const foundPerson = persons.find(person => person.name === newName.trim());

        // in case 'new' entry is exact copy of an older entry
        if (newNumber === foundPerson.number) {
          alert('This entry already exists'); 
        } else {
          // double check with user before updating data
          const confirmUpdate = window.confirm(`${foundPerson.name} is already added to the phonebook. Replace old number with a new one?`);
          
          if (confirmUpdate) {
            const updatedPerson = {
              ...foundPerson,
              number: newNumber
            };

            // update person data 
            personServices
              .updateEntry(foundPerson.id, updatedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== returnedPerson.id ? person : updatedPerson))
                setNewName('');
                setNewNumber('');
                setFilterValue('');
              });
          } else { // if user chooses no to update prompt
            setNewName('');
            setNewNumber('');
            setFilterValue('');
          }  
        }
      } else { // if an entry for the name entered doesn't already exist
        const personObject = {
          name: newName.trim(),
          number: newNumber.trim()
        };

        personServices
          .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
            setFilterValue('');
          });
      }
    } else {
      // an error is displayed and the form reset in case name, number, or both fields are empty
      alert('Please enter a valid name and number. Neither field can be empty');
      setNewName('');
      setNewNumber('');
      setFilterValue('');
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
