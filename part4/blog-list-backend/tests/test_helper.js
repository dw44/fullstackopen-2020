const Blog = require('../models/Blog');
const User = require('../models/User');

const initialBlogs = [
  {
    title: 'Top Tier Carries in the Meta',
    author: 'KawaiiSocks',
    url: 'https://www.dotabuff.com/blog/2020-10-06-top-tier-carries-in-the-meta',
    likes: 9,
  },
  {
    title: 'Top Tier Mids in the Meta',
    author: 'KawaiiSocks',
    url: 'https://www.dotabuff.com/blog/2020-10-13-top-tier-mids-in-the-meta',
    likes: 6,
  },
  {
    title: 'Top Tier Offlaners in the Meta',
    author: 'KawaiiSocks',
    url: 'https://www.dotabuff.com/blog/2020-09-29-top-tier-offlaners-in-the-meta',
    likes: 10,
  },
  {
    title: 'The Secret of Simple Code',
    author: 'Eric Elliot',
    url: 'https://medium.com/javascript-scene/the-secret-of-simple-code-a2cacd8004dd',
    likes: 8,
  },
];

const initialUsers = [
  {
    name: 'ABC DEFGH',
    username: 'abcdefgh',
    password: 'abcdefgh',
  },
  {
    name: 'IJKLM NOP',
    username: 'ijklmnop',
    password: 'ijklmnop',
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDB,
};
