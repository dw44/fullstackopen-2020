const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const Person = require('./models/person');

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

app.get('/', (req, res) => {
  res.send('Online!');
});

// modified to get data from db for exercise 3.13 (also covers 3.18)
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

// refactored for 3.18
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// refactored for exercise 3.15
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

// updated for exercise 3.14 to save data to db instead of locally.
// refactored for exercise 3.19
app.post('/api/persons', (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number
  });

  newPerson.save()
    .then(result => {
      console.log(result)
      res.json(result);
    }) // catch block added for exercise 3.19
    .catch(error => next(error));
});

// updated for 3.17
app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  };

  // refactored to validate data for update operations
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(result => res.json(result))
    .catch(error => next(error));
});

// added in exercise 3.15 - covers exercise 3.16 
const unknownEndpoint = (req, res) => {
  return res.status(404).send({ Error: 'Unknown Endpoint' });
}

// added in exercise 3.15 - covers exercise 3.16
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ Error: 'Malformed ID' });
  } else if (err.name === 'ValidationError') { // this block added for exercise 3.19
    return res.status(409).send({ Error: err.message });
  }
  next(err);
}

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App running on port ${ PORT }`));