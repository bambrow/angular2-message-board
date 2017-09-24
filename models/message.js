// message model

var mongoose = require('mongoose'); // import
var Schema = mongoose.Schema; // helper object to create model of objects
var User = require('./user');

// schema for message
var schema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
  // internal type mongoose uses to store id of objects, in mongodb stores in ObjectId
});

schema.post('remove', function(message) {
  User.findById(message.user, function(err, user) {
    user.messages.pull(message._id);
    user.save();
  });
});

// export the actual model
module.exports = mongoose.model('Message', schema);
// we can use new Message to create new message later
// mongoose will use 'messages' as collection name also
