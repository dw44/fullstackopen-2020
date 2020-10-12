import axios from 'axios';

const baseURL = '/api/persons';

// This module is for exercise 2.16

const getAll = () => axios.get(baseURL).then((response) => response.data);

const create = (newEntry) => axios.post(baseURL, newEntry).then((response) => response.data);

// added for 2.17
const deleteEntry = (id) => axios.delete(`${baseURL}/${id}`);

// added for 2.18
const updateEntry = (id, updatedData) => axios.put(`${baseURL}/${id}`, updatedData).then((response) => response.data);

export default {
  getAll,
  create,
  deleteEntry,
  updateEntry,
};
