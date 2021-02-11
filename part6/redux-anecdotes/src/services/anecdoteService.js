import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

// working as intended
const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

// added for 6.14
const createNew = async (content) => {
  // const getId = () => (100000 * Math.random()).toFixed(0);
  const response = await axios.post(baseURL, { content, votes: 0 });
  return response.data;
};

// updated for 6.14
const exports = {
  getAll,
  createNew,
};

export default exports;
