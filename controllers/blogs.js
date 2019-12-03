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

blogsRouter.post('/', (request, response) => {
  console.log('request.body: ', request.body);
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      console.log('result: ', result);
      response.status(201).json(result);
    });
});

module.exports = blogsRouter;
