var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  id: String,
  pw: String,
  author: String
});
module.exports = mongoose.model('user', userSchema);