// mongo.js file created for exercise 3.12 

const mongoose = require('mongoose');

const password = process.argv[2];
const dbURI = `mongodb+srv://admin:${password}@cluster0.lsv2n.azure.mongodb.net/Phonebook-App?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  // only try to create and save a new entry if the proper number of arguments are provided
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });
  // create and save new document
  person
    .save()
    .then(result => {
      console.log('Phonebook Entry Saved:');
      console.log(result);
      mongoose.connection.close();
    })
    .catch(error => {
        console.log(error);
    });
} else if (process.argv.length === 3) {
  // in case no arguments defining a new person are provided, fetch and display all existing records
  Person.find({})
    .then(result => {
      console.log('Phonebook Entries:');
      result.forEach(person => console.log(person));
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error);
    });
} else {
  console.log('Please enter the query in the proper format:\n');
  console.log('node <mongo.js> <password> for all records, or\n');
  console.log('node <mongo.js> <password> <entryName> <entryNumber> to make a new entry.\n');
  process.exit(1);
}