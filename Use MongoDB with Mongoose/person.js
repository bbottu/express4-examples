var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var personSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  age: {type: Number, required: true}
});
 
module.exports = mongoose.model('Person', personSchema);