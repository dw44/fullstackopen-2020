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

// added for exercise 4.7
const mostLikes = (blogs) => {
  if (!blogs.length) return {};

  const authorLikes = {};

  // populate 'authorLikes' with authors and total likes for their blogs
  _.forEach(blogs, (blog) => {
    authorLikes[blog.author] = _.keys(authorLikes).includes(blog.author)
      ? authorLikes[blog.author] + blog.likes
      : blog.likes;
  });

  // get author with most likes from authorLikes
  const maxLikes = _.maxBy(_.keys(authorLikes), (key) => authorLikes[key]);

  return {
    author: maxLikes,
    likes: authorLikes[maxLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
