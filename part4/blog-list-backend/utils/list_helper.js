// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

// added for exercise 4.4
const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

// added for exercise 4.5
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const likes = blogs.map((blog) => blog.likes);
  const favorite = blogs[likes.indexOf(Math.max(...likes))];
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
