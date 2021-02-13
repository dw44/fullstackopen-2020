import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

// working as intended
const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

// added for 6.14
// updated for 6.16
const createNew = async (content) => {
  const response = await axios.post(baseURL, { content, votes: 0 });
  return response.data;
};

// created for 6.17
const upvote = async (id) => {
  const anecdote = await axios.get(`${baseURL}/${id}`);
  const response = await axios.put(`${baseURL}/${id}`, { votes: anecdote.data.votes + 1, content: anecdote.data.content, id });
  return response.data;
};

// updated for 6.14
const exports = {
  getAll,
  createNew,
  upvote,
};

export default exports;
