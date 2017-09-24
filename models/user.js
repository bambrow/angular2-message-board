// user model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// import mongoose-unique-validator to guarantee a unique key of email
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type:String, required: true, unique: true},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

// plugin the validator
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
