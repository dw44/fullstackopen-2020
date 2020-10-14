const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

// added for exercise 4.4
const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

// added for exercise 4.5
const favoriteBlog = (blogs) => {
  if (!blogs.length) return {};

  const likes = blogs.map((blog) => blog.likes);
  const favorite = blogs[likes.indexOf(Math.max(...likes))];
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

// added for exercise 4.6
// desc: return author with most blogs and number of blogs for said author
const mostBlogs = (blogs) => {
  if (!blogs.length) return {};

  const most = {
    author: '',
    blogs: 0,
  };

  _.each(
    _.countBy(blogs, (blog) => blog.author),
    (value, key) => {
      if (value > most.blogs) {
        _.assign(most, { author: key, blogs: value });
      }
    },
  );

  return most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
