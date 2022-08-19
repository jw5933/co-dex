import axios from 'axios';
const baseUrl = '/api/words';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

//api
const getWordFromAPI = async word => {
  const apikey = process.env.REACT_APP_API_KEY;
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
  const config = {
    headers: {
      'X-RapidAPI-Key': `${apikey}`,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  const response = await axios.get(url, config);
  return response.data;
};

const addWord = async word => {
  const response = await axios.post(baseUrl, {word});
  return response.data;
};

const getWord = async word => {
  const response = await axios.get(`${baseUrl}/find`, {params: {word: word}});
  return response.data;
};

const addDefinitionToWord = async ({definition, word}) => {
  const response = await axios.put(`${baseUrl}/${word.id}`, {definition});
  return response.data;
};

const removeWord = async word => {
  const response = await axios.delete(`${baseUrl}/${word.id}`);
  return response.data;
};

export default {
  getAll,
  getWordFromAPI,
  addWord,
  getWord,
  addDefinitionToWord,
  removeWord,
};