const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    "name": "Arto Hellas",
    "number": "125-6160744",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "250-7258844",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

const generateID = () => {
  let id;
  do { // to avoid accidentally generating an id that already exists
    id = Math.floor(Math.random() * 1000000);
  } while (persons.map(p => p.id).includes(id));
  return id;
}

app.get('/', (req, res) => {
  res.send('Online!');
});

app.get('/info', (req, res) => {
  const total = persons.length;
  const dateTime = new Date();
  const info = `<p>Phonebook has info for ${ total } people.</p><p>${ dateTime }</p>`;
  res.send(info);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: 'Entry not found' });
  }
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

app.listen(3001, () => console.log('App running on port 3001'));