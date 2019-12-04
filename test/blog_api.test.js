const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

const apiURL = '/api/blogs';

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get(apiURL)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('returned correct amount of blogs', async () => {
  const response = await api.get(apiURL);
  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('new blog can be added to the DB', async () => {
  const newBlog = {
    title: 'Test blog 100',
    author: 'Edgar Cheverier',
    url: 'https://www.google.com/',
    likes: 8,
  };

  await api
    .post(apiURL)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get(apiURL);
  expect(response.body.length).toBe(helper.initialBlogs.length + 1);

  const contents = response.body.map((ele) => ele.title);
  expect(contents).toContain('Test blog 100');
});

afterAll(() => {
  mongoose.connection.close();
});
