import axios from 'axios';
const baseUrl = '/api/definitions';

const addDefinition = async definition => {
  const response = await axios.post(baseUrl, definition);
  return response.data;
};

const removeDefinition = async definition => {
  const response = await axios.delete(`${baseUrl}/${definition.id}`);
  return response.data;
};

const updateDefinition = async definition => {
  console.log(definition);
  const response = await axios.put(`${baseUrl}/${definition.id}`, definition);
  return response.data;
};

export default {
  addDefinition,
  removeDefinition,
  updateDefinition,
};