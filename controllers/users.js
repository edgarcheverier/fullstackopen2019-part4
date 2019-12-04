/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  try {
    const result = await User.find({});
    response.json(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).end();
  }
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  if (!body.password || !body.username || !body.name) {
    return response.status(404).json({ error: 'missing user content' });
  }
  try {
    const password = await bcrypt.hash(body.password, 10);
    const user = new User({
      username: body.username,
      name: body.name,
      password,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    console.log(error.message);
    response.status(500).end();
  }
});

module.exports = usersRouter;
