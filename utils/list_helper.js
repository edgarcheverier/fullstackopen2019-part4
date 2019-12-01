const dummy = (blogs) => {
  console.log(blogs);
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
