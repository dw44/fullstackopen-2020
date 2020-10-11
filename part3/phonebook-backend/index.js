const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const Person = require('./models/person');
const { response } = require('express');

// logs request body for post requests only
// for exercise 3.8
morgan.token('requestBody', req => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body); 
  } else {
    return ' ';
  }
});

app.use(express.json());
// for exercise 3.8
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'));
app.use(cors());
app.use(express.static('build')); 

const PORT = process.env.PORT;

// Not needed after switching to DB in exercise 3.13
// const generateID = () => {
//   let id;
//   do { // to avoid accidentally generating an id that already exists
//     id = Math.floor(Math.random() * 1000000);
//   } while (persons.map(p => p.id).includes(id));
//   return id;
// }

app.get('/', (req, res) => {
  res.send('Online!');
});

// modified to get data from db for exercise 3.13
app.get('/info', (req, res) => {
  Person.find({})
  .then(results => {
    const total = results.length;
    const dateTime = new Date();
    const info = `<p>Phonebook has info for ${ total } people.</p><p>${ dateTime }</p>`;
    res.send(info);
  });
});

// modified to get data from db for exercise 3.13
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(entries => {
      res.json(entries);
    });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(result => {
      res.json(result);
    })
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'No entry found' });
  }
});

app.post('/api/persons', (req, res) => {
  const newID = generateID();
  
  if (!req.body.name || req.body.name.trim() === '') {
    // in case the name field is empty or whitespace
    return res.status(400).json({ error: 'Name field can\'t be empty'});
  } else if (!req.body.number || req.body.number.trim() === '') {
    // in case the number field is empty or whitespace
    return res.status(400).json({ error: 'Number field can\'t be empty'});
  } else if (persons.findIndex(person => person.name === req.body.name.trim()) !== -1) {
    // in case an entry for a person with the entered name already exists
    return res.status(400).json({ error: 'An entry for this name already exists'});
  }

  const newPerson = {
    id: newID,
    name: req.body.name,
    number: req.body.number
  }

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.listen(PORT, () => console.log(`App running on port ${ PORT }`));