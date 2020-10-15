// module created for exercise 4.8
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/Blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// test for exercise 4.8
test('get request returns correct number of blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// test for exercise 4.9
test('blog posts have a unique "id" identifier', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
