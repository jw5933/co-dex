import axios from 'axios';
const baseUrl = '/api/words';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

//api
const getWord = word => {
	const options = {
		method: 'GET',
		url: 'https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D',
		headers: {
		  'X-RapidAPI-Key': `${process.env.API_KEY}`,
		  'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
		}
	};

	const request = axios.request(options);
	return request
		.then(response => response.data)
		.catch(error => console.error(error))
}
export default {getAll, getWord};