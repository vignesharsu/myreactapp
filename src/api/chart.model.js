const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Chart = new Schema({
  year: {
    type: String
  },
  points: {
    type: String
  },
  userId: {
    type: String
  }
},{
    collection: 'chart'
});

module.exports = mongoose.model('Chart', Chart);