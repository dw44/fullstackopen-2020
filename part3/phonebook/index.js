const express = require('express');
const app = express();

app.use(express.json());

const persons = [
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

app.get('/', (req, res) => {
  res.send('Online!');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.listen(3001, () => console.log('App running on port 3001'));