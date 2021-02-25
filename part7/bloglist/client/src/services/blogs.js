import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/blogs';

let token = '';

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response;
};

const addLike = (id, newBlog) => axios.put(`${baseUrl}/${id}`, newBlog).then((response) => response.data);

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
