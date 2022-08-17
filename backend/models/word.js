const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: String,
  definitions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Definition'}],
});

wordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
