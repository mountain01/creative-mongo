const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Spell = new Schema({
  "name": String,
  "castingTime": String,
  "range": String,
  "duration": String,
  "components": {
    "verbal": Boolean,
    "material": Boolean,
    "semantic": Boolean
  },
  "materialComponents": String,
  "level": String,
  "school": String,
  "description": String,
  "higherLevels": String
});

module.exports = mongoose.model('Spell', Spell);
