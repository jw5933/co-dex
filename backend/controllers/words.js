// eslint-disable-next-line new-cap
const wordsRouter = require('express').Router();
const Word = require('../models/word');

wordsRouter.get('/', async (request, response) => {
  const words = await Word.find({}).populate('definitions', {id: 0});
  response.json(words);
});

wordsRouter.get('/find', async (request, response) => {
  const word = request.query.word;
  const re = new RegExp(`^${word}$`, 'i');
  const foundWords = await Word.find({word: re});
  response.json(foundWords);
});

wordsRouter.post('/', async (request, response) => {
  const newWord = new Word(request.body);

  const word = await newWord.save();
  console.log(word);
  return response.status(201).json(word);
});

wordsRouter.put('/:id', async (request, response) => {
  const definition = request.body.definition;
  const word = await Word.findById(request.params.id);

  const newWord = {definitions: word.definitions.concat(definition.id)};
  const updatedWord = await Word
      .findByIdAndUpdate(request.params.id, newWord, {new: true})
      .populate('definitions', {id: 0});
  return response.json(updatedWord);
});

module.exports = wordsRouter;
