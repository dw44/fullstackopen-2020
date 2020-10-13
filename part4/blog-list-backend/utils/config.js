// module created for exercise 4.2
require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;

module.exports = {
  PORT,
  MONGODB_URI,
};
