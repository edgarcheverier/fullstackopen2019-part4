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

describe('Get all the blogs', () => {
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
});

describe('Post Blog', () => {
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
});

describe('Delete Blog', () => {
  test('can delete a blog from the DB', async () => {
    const responseBeforeDelete = await api.get(apiURL);
    const blogForDeleteId = responseBeforeDelete.body[0].id;
    const blogForDeleteTitle = responseBeforeDelete.body[0].title;

    await api
      .delete(`${apiURL}/${blogForDeleteId}`)
      .expect(204);

    const response = await api.get(apiURL);
    expect(response.body.length).toBe(helper.initialBlogs.length - 1);

    const contents = response.body.map((ele) => ele.title);
    expect(contents).not.toContain(blogForDeleteTitle);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
