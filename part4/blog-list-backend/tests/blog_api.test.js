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

// for tests - username: test/test2, password: test/test2

// tests refactored and grouped into describe blocks before 4.22
describe('fetching data from db works as intended', () => {
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
});

// tests refactored and grouped into describe blocks before 4.22
describe('post new blog operations working as intended', () => {
// tests for exercise 4.10
// fixed to include auth for exercise 4.22
  test('new blog is saved to db following post request', async () => {
    const blog = {
      title: 'Test blog for testing api',
      author: 'Leshrac',
      url: 'https://www.leshrac.com/testBlog',
      likes: 0,
    };

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'test', password: 'test' });

    const { token } = JSON.parse(loginResponse.text);

    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogList = await helper.blogsInDB();
    expect(blogList.length).toEqual(helper.initialBlogs.length + 1);

    const blogAuthors = blogList.map((blogPost) => blogPost.author);
    expect(blogAuthors).toContain('Leshrac');
  });

  // test for exercise 4.11
  // fixed for exercise 4.22
  test('likes default to 0', async () => {
    const blog = {
      title: 'Test blog for testing api',
      author: 'Leshrac',
      url: 'https://www.leshrac.com/testBlog',
    };

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'test', password: 'test' });

    const { token } = JSON.parse(loginResponse.text);

    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: `Bearer ${token}` });

    const blogList = await helper.blogsInDB();
    const { likes } = blogList[blogList.length - 1];
    expect(likes).toBe(0);
  });

  // test for exercise 4.12
  test('returns bad request if both title and url are missing', async () => {
    const blog = {
      author: 'Leshrac',
    };

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400);
  });

  // added for exercise 4.22
  test('returns 401 if no token is provided', async () => {
    const newBlog = {
      title: 'ABC DEF GHI',
      author: 'XYZT KLM',
      url: 'https://xyztklm.com/blogs/abcdefghi',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
});

// tests refactored and grouped into describe blocks before 4.22
describe('delete operations working as intended', () => {
  // fixed to work with authentication for 4.22
  test('deleting a blog entry return 401 for unauthorized user', async () => {
    let loginResponse = await api
      .post('/api/login')
      .send({ username: 'test', password: 'test' });

    let { token } = JSON.parse(loginResponse.text);

    const posted = await api
      .post('/api/blogs')
      .send({ title: 'ABCDEF', author: 'ghij', url: 'www.abc.com' })
      .set({ Authorization: `Bearer ${token}` });

    const blogID = JSON.parse(posted.text).id;

    loginResponse = await api
      .post('/api/login')
      .send({ username: 'test2', password: 'test2' });

    token = JSON.parse(loginResponse.text).token;

    await api
      .delete(`/api/blogs/${blogID}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(401);
  });

  // fixed to work with authentication for 4.22
  test('deleting a blog entry return 204 for authorized user', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'test', password: 'test' });

    const { token } = JSON.parse(loginResponse.text);

    const posted = await api
      .post('/api/blogs')
      .send({ title: 'ABCDEF', author: 'ghij', url: 'www.abc.com' })
      .set({ Authorization: `Bearer ${token}` });

    const blogID = JSON.parse(posted.text).id;

    await api
      .delete(`/api/blogs/${blogID}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204);
  });
});

// added for exercise 4.14
test('updates blog when given a valid id', async () => {
  const startBlogs = await helper.blogsInDB();
  const blogToEditID = startBlogs[0].id;

  const updates = {
    author: 'Kawaii',
    likes: 16,
  };

  await api
    .put(`/api/blogs/${blogToEditID}`)
    .send(updates)
    .expect(204);

  const updatedBlogs = await helper.blogsInDB();
  expect(updatedBlogs[0].likes).toBe(updates.likes);
  expect(updatedBlogs[0].author).toBe(updates.author);
});

afterAll(() => {
  mongoose.connection.close();
});
