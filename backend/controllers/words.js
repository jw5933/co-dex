// eslint-disable-next-line new-cap
const wordsRouter = require('express').Router();

wordsRouter.get('/', (request, response) => {
  response.send('Hello');
});

module.exports = wordsRouter;
