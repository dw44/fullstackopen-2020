/* eslint-disable no-underscore-dangle */
// module created for exercise 4.2
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');

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
// refactored for 4.19
// refactored for 4.20
blogRouter.post('/', async (request, response) => {
  const { body, token } = request;

  if (!body.title && !body.url) {
    response.status(400).end();
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Missing or invalid token' });
    }

    const user = await User.findById(decodedToken.id);

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
// rewritten for exercise 4.21
blogRouter.delete('/:id', async (request, response) => {
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'Must be logged in to delete a blog' });
  }

  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });

  if (!blog) {
    // blog not found
    response.status(404).json({ error: 'Blog not found' });
  }

  const blogUserID = blog.user.id.toString(); // user who saved blog

  if (blogUserID === decodedToken.id) {
    const user = await User.findById(blogUserID);
    user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString());
    await user.save();
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).json({ status: 'Blog deleted!' });
  }

  return response.status(401).json({ error: 'This user is not authorized to delete this blog' });
});

// added for exercise 4.14
// needs to have auth integrated at some point
// updated for 5.8 to return json in a more standardized format
blogRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const original = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });

  if (!original) response.status(404).end();

  const originalJSON = original.toJSON();

  const blog = {
    title: body.title || originalJSON.title,
    author: body.author || originalJSON.author,
    url: body.url || originalJSON.url,
    likes: body.likes || originalJSON.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 });
  response.json(updatedBlog).status(204);
});

module.exports = blogRouter;
