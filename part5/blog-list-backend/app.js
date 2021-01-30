/* eslint-disable global-require */
// module created for exercise 4.2
const express = require('express');
require('express-async-errors');

const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

logger.info('Logging in to MongoDB...');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Error Connecting to MongoDB: ', error.message));

app.use(cors());
app.use(express.json());
// added for 4.20
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// added for exercise 5.17
// uses testingRouter only when in test mode
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
