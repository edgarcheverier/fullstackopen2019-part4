const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;
  return blogs.reduce((acc, item) => acc + item.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
