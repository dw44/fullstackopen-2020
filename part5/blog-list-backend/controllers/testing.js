// added for end to end testing for exercises 5.17-5.22

const router = require('express').Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

router.post('/reset', async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  response.status(204).end();
});

module.exports = router;
