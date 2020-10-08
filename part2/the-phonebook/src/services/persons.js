import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

// This module is for exercise 2.16

const getAll = () => {
  return axios.get(baseURL).then(response => response.data);
}

const create = newEntry => {
  return axios.post(baseURL, newEntry).then(response => response.data);
}

// added for 2.17
const deleteEntry = id => {
  return axios.delete(`${baseURL}/${id}`);
}

// added for 2.18
const updateEntry = (id, updatedData) => {
  return axios.put(`${baseURL}/${id}`, updatedData).then(response => response.data);
}


export default {
  getAll,
  create,
  deleteEntry,
  updateEntry
};