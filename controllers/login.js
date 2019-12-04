/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  if (!body.username || !body.password) return response.status(400).end();

  const user = await User.findOne({ username: body.username });
  if (!user) return response.status(401).json({ error: 'invalid username' });

  const passwordCorrect = await bcrypt.compare(body.password, user.password);
  if (!passwordCorrect) return response.status(401).json({ error: 'invalid password' });

  const userToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userToken, process.env.SECRET);

  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
