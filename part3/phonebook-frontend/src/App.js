import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import NewEntry from './components/NewEntry';
import Display from './components/Display';
import Notification from './components/Notification';
import personServices from './services/persons';

// initialized for exercise 2.6
const App = () => {
  // refactored for exercise 2.11
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterValue, setFilterValue ] = useState('');
  // first item is message, second is notification type: S for success, E for error
  const [ notification, setNotification ] = useState([null, null]);

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

  const resetForms = () => {
    // helper function to reduce clutter
    setNewName('');
    setNewNumber('');
    setFilterValue('');
  }

  const verifyFormFilled = () => {
    // returns false if either name or number field is empty i.e. verification failed
    if (newName.trim().length < 1 || newNumber.trim().length < 1) {
      alert('Please enter a valid name and number. Neither field can be empty');
      resetForms();
      return false;
    }
    // return true if neither field is empty i.e. verification passed
    return true;
  }

  // completely rewritten for 2.18
  const handleSubmit = event => {
    event.preventDefault();

    // verify that both fields are filled out
    if (!verifyFormFilled()) return; 
    else {
      // checks if a person entry for newName already exists
      const nameExists = persons.filter(person => person.name === newName.trim()).length > 0;

      if (nameExists) {
        const foundPerson = persons.find(person => person.name === newName.trim());

        // in case 'new' entry is exact copy of an older entry
        if (newNumber === foundPerson.number) {
          alert('This entry already exists');
          resetForms();
        } else {
          // confirm with user before updating data
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
                resetForms();
                
                // added for 2.19. Displayed upon succesfully updating an entry
                setNotification([`Entry for ${ returnedPerson.name } succesfully updated!`, 'S']);
                setTimeout(() => setNotification([null, null]), 5000);
              })
              .catch(error => {
                // updated for 3.20. error messages displayed for failing validation on update operations
                setNotification([error.response.data.Error, 'E']);
                setTimeout(() => setNotification([null, null]), 5000);
              });

          } else { // if user chooses no to update prompt
            resetForms();
          }  
        }
      } else { 
        // if an entry for the name entered doesn't already exist
        const personObject = {
          name: newName.trim(),
          number: newNumber.trim()
        };

        personServices
          .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson));
            resetForms();

            // added for 2.19. Displayed upon succesfully adding an entry
            setNotification([`Entry for ${ newPerson.name } succesfully added!`, 'S']);
            setTimeout(() => setNotification([null, null]), 5000);
          })
          .catch(error => { // catch block added for exercise 3.20
            setNotification([error.response.data.Error, 'E']);
            setTimeout(() => setNotification([null, null]), 5000);
          });
      }
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
        })
        .catch(error => {
          // added for 2.20
          // displays a message and removes entry from state if already deleted from server
          setNotification([
            `The entry for ${persons[id-1].name} has already been deleted from the server`,
            'E'
          ]);
          setTimeout(() => setNotification([null, null]), 5000);
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
      <Notification message={ notification } />
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
