import axios from 'axios'
const baseUrl = '/api/blogs'

// added for 5.3
let token = '';

// added for 5.3
const setToken = newToken => {
  token = `Bearer ${ newToken }`;
} 

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

// added for 5.3
const createNew = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

export default { getAll, createNew, setToken };