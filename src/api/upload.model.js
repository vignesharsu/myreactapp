const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Upload = new Schema({
  image: {
    type: Buffer,
  },
  userId: {
    type: String
  }
},{
    collection: 'upload'
});

module.exports = mongoose.model('Upload', Upload);