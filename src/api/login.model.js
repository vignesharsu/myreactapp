const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Login = new Schema({
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  }
},{
    collection: 'login'
});

module.exports = mongoose.model('Login', Login);