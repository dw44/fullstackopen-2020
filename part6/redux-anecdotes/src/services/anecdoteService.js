import axios from 'axios';

const baseURL = 'http://localhost:3001';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const exports = {
  getAll,
};

export default exports;
