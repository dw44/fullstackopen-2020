import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/blogs';

// added for 5.3
let token = '';

// added for 5.3
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// added for 5.3
const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response;
};

// added for 5.8
const addLike = (id, newBlog) => axios.put(`${baseUrl}/${id}`, newBlog).then((response) => response.data);

// added for 5.10
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default {
  getAll, createNew, setToken, addLike, deleteBlog,
};
