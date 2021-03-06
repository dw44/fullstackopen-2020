const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// refactored for 4.17
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1, author: 1, url: 1,
  });
  response.json(users);
});

// refactored for 4.17
usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.username || !body.password) {
    response.status(400).json({ error: 'Username or password missing. Please enter both.' });
  } else if (body.password.length < 3) {
    response.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
