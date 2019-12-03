/* eslint-disable no-plusplus */
const dummy = (blogs) => {
  console.log('dummy blogs: ', blogs);
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;
  return blogs.reduce((acc, item) => acc + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  const result = {};

  if (!blogs.length) return result;

  blogs.forEach((blog) => {
    if (!result.likes) {
      result.title = blog.title;
      result.author = blog.author;
      result.likes = blog.likes;
    } else if (result.likes < blog.likes) {
      result.title = blog.title;
      result.author = blog.author;
      result.likes = blog.likes;
    }
  });
  return result;
};

const mostBlogs = (blogs) => {
  const authors = [];

  blogs.forEach((blog) => {
    if (!authors.length) {
      const author = {
        author: blog.author,
        blogs: 1,
      };
      authors.push(author);
    } else {
      let found = false;
      authors.forEach((ele, i) => {
        if (blog.author === ele.author) {
          authors[i].blogs += 1;
          found = true;
        }
      });
      if (!found) {
        authors.push({
          author: blog.author,
          blogs: 1,
        });
      }
    }
  });
  authors.sort((a, b) => b.blogs - a.blogs);
  return authors[0];
};

const mostLikes = (blogs) => {
  const authors = [];

  blogs.forEach((blog) => {
    if (!authors.length) return authors.push({ author: blog.author, likes: blog.likes });
    let found = false;
    authors.forEach((ele, i) => {
      if (ele.author === blog.author) {
        authors[i].likes += blog.likes;
        found = true;
      }
    });
    if (!found) {
      authors.push({ author: blog.author, likes: blog.likes });
    }
  });
  authors.sort((a, b) => b.likes - a.likes);
  return authors[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
