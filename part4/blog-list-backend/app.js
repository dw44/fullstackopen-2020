// module created for exercise 4.2
const express = require('express');
require('express-async-errors');

const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogs');

logger.info('Logging in to MongoDB...');
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Error Connecting to MongoDB: ', error.message));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

module.exports = app;
