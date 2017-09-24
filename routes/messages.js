
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var Message = require('../models/message');

router.get('/', function(req, res, next) {
  Message
  .find()
  .populate('user', 'firstName')
  .exec(function(err, messages) {
    if (err) {
      return res.status(500).json({
        title: 'Error occured',
        error: err
      });
    }
    res.status(200).json({
      message: 'Retrieve successful',
      obj: messages
    });
  });
});

router.use('/', function(req, res, next) {
  jwt.verify(
    req.query.token,
    'secret-string-for-token',
    function(err, decoded) {
      if (err) {
        return res.status(401).json({
          title: 'Not authenticated',
          error: err
        });
      }
      next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token); // we already verify the token above
    User.findById(decoded.user._id, function(err, user){
      if (err) {
        return res.status(500).json({
          title: 'Error occured',
          error: err
        });
      }
      var message = new Message({
        content: req.body.content,
        user: user._id
      });
      var usr = {
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      };
      message.save(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'Error occured',
            error: err
          });
        }
        user.messages.push(result);
        user.save();
        res.status(201).json({
          message: 'Message saved successful',
          obj: result,
          user: usr
        });
      });
    });
});

router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: 'Error occured',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No message',
        error: {message: 'No valid message'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: 'User does not match'
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'Error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Message updated successful',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: 'Error occured',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No message',
        error: {message: 'No valid message'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: 'User does not match'
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'Error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Message deleted successful',
        obj: result
      });
    });
  });
});

module.exports = router;
