const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
// const User = require('../models/User');
const helper = require('./test_helper');

const api = supertest(app);

// disabled to test login functionality in blog api
// beforeEach(async () => {
//   await User.deleteMany({});
// });

describe('incomplete data while creating new user', () => {
  test('no username provided', async () => {
    const newUser = {
      name: 'Test Name',
      password: 'testpass',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('no password provided', async () => {
    const newUser = {
      name: 'Test Name',
      username: 'testuser',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('password/username too short', () => {
  test('username too short', async () => {
    const newUser = {
      name: 'ABCDE',
      username: 'a',
      password: 'abcdefgh',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('password too short', async () => {
    const newUser = {
      name: 'ABCDE',
      username: 'abcdefgh',
      password: 'a',
    };

    const response = await api
      .post('/api/users')
      .send(newUser);

    expect(JSON.parse(response.error.text).error)
      .toBe('Password must be at least 3 characters long');
  });
});

// added for exercise 4.16
test('user already exists', async () => {
  // added here instead of beforeEach as saving to db takes time and isn't needed for other tests
  await api
    .post('/api/users')
    .send(helper.initialUsers[0]);

  // same as initialUsers[0]
  const newUser = {
    name: 'ABC DEFGH',
    username: 'abcdefgh',
    password: 'abcdefgh',
  };

  const response = await api.post('/api/users').send(newUser);
  expect(response.statusCode).toBe(400);
  expect(JSON.parse(response.text).error).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `abcdefgh`');
});

test('create new', async () => {
  const newUser = {
    name: 'Test 2',
    username: 'test2',
    password: 'test2',
  };

  await api.post('/api/users').send(newUser);
});

afterAll(() => {
  mongoose.connection.close();
});
