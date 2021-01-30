// module created for exercise 4.2
// refactored for 4.8
require('dotenv').config();

const { PORT } = process.env;
let { MONGODB_URI } = process.env;

// added for 4.8. Uses different mongodb url if running in test mode
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  PORT,
  MONGODB_URI,
};
