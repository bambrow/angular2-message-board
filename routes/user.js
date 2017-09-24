
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email
    });
    user.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'Error occured',
          error: err
        });
      }
      res.status(201).json({
        message: 'User created successfully',
        obj: result
      });
    });
});

router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'Error occured',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var token = jwt.sign(
      {user: user},
      'secret-string-for-token',
      {expiresIn: 7200}
    );
    res.status(200).json({
      message: 'Log in successful',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
