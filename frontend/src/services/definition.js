import axios from 'axios';
const baseUrl = '/api/definitions';

const addDefinition = async definition => {
  const response = await axios.post(baseUrl, definition);
  return response.data;
};

export default {addDefinition};