const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('Logging in to MongoDB...');

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(connected => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Error connecting to MongoDB: ${error.message}`));

const personSchema = mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
});

module.exports = mongoose.model('Person', personSchema);