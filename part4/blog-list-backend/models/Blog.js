// module created for exercise 4.2
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model('Blog', blogSchema);
