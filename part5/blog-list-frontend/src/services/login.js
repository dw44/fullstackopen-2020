import axios from 'axios'
const baseUrl = '/api/login'

// added for 5.1
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

export default { login };