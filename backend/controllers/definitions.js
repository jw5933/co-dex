// eslint-disable-next-line new-cap
const defsRouter = require('express').Router();
const Definition = require('../models/definition');

defsRouter.post('/', async (request, response) => {
  const body = request.body;

  const definition = new Definition({
    partOfSpeech: body.partOfSpeech,
    definition: body.definition,
    examples: body.examples,
  });
  const savedDefinition = await definition.save();
  return response.status(201).json(savedDefinition);
});

module.exports = defsRouter;
