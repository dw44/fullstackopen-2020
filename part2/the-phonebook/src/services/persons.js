import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

// This module is for exercise 2.16

const getAll = () => axios.get(baseURL).then(response => response.data);

const create = newEntry => axios.post(baseURL, newEntry).then(response => response.data);

// added for 2.17
const deleteEntry = id => axios.delete(`${baseURL}/${id}`);

export default {
  getAll,
  create,
  deleteEntry
};