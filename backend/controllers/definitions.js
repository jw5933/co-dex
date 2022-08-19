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

defsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const deletedDefinition = await Definition.findByIdAndRemove(id);
  return response.status(201).json(deletedDefinition);
});

defsRouter.put('/:id', async (request, response) => {
  const definition = {definition: request.body.definition};
  console.log(definition);
  const updatedDefinition = await Definition
      .findByIdAndUpdate(request.params.id, definition, {new: true});
  console.log(updatedDefinition);
  return response.json(updatedDefinition);
});

module.exports = defsRouter;
