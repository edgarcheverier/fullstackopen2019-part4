/* eslint-disable consistent-return */
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
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    console.log('error: ', error.message);
    response.status(500).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log(error.message);
    response.status(500).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  try {
    const updatedBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
    };
    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
    if (result) return response.json(result);
    response.status(404).end();
  } catch (error) {
    console.log(error.message);
    response.status(404).end();
  }
});

module.exports = blogsRouter;
