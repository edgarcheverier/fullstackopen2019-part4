require('dotenv').config();
const http = require('http');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(mongoUrl, mongooseOptions);

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
});

app.post('/api/blogs', (request, response) => {
  console.log('request.body: ', request.body);
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      console.log('result: ', result);
      response.status(201).json(result);
    })
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
