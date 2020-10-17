/* eslint-disable no-underscore-dangle */
// module created for exercise 4.2
const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// refactored for exercise 4.8
// refactored for 4.17
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

// refactored for exercise 4.10
// refactored for exercise 4.12
// refactored for 4.17
blogRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.title && !body.url) {
    response.status(400).end();
  } else {
    const users = await User.find({});
    const index = Math.floor(Math.random() * users.length);
    const user = users[index];

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
});

// added for exercise 4.13
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// added for exercise 4.14
blogRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const original = await Blog.findById(request.params.id);

  if (!original) response.status(404).end();

  const originalJSON = original.toJSON();

  const blog = {
    title: body.title || originalJSON.title,
    author: body.author || originalJSON.author,
    url: body.url || originalJSON.url,
    likes: body.likes || originalJSON.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(204).json(updatedBlog);
});

module.exports = blogRouter;
