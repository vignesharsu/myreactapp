const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Contact = new Schema({
  name: {
    type: String
  },
  designation: {
    type: String
  },
  address: {
    type: String
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  },
  userId: {
    type: String
  }
},{
    collection: 'contact'
});

module.exports = mongoose.model('Contact', Contact);