/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const users = await User.find({});
  const userIndex = Math.floor(Math.random() * users.length);
  const user = users[userIndex];

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  };
  const blog = new Blog(newBlog);

  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
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
