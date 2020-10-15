// module created for exercise 4.2
const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

// refactored for exercise 4.8
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
