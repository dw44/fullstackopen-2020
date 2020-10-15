// module created for exercise 4.2
const blogRouter = require('express').Router();
const note = require('../../../../fso/3-2/models/note');
const Blog = require('../models/Blog');

// refactored for exercise 4.8
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// refactored for exercise 4.10
// refactored for exercise 4.12
blogRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.title && !body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

// added for exercise 4.13
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
