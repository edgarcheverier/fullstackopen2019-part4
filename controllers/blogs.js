const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  console.log('request.body: ', request.body);
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    console.log('result: ', result);
    response.status(201).json(result);
  } catch (error) {
    console.log('error: ', error.message);
    response.status(500).end();
  }
});

module.exports = blogsRouter;
