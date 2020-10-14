const dummy = (blogs) => {
  console.table(blogs);
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
