const mongoose = require('mongoose');

const definitionSchema = new mongoose.Schema({
  partOfSpeech: String,
  definition: String,
  examples: [String],
});

definitionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Definition = mongoose.model('Definition', definitionSchema);

module.exports = Definition;
