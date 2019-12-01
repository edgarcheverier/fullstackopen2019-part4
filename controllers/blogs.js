const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
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
