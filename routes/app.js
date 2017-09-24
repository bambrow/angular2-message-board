// route registered on the server

var express = require('express');
var router = express.Router();
var User = require('../models/user');

// res: the response object created by express.js

router.get('/', function (req, res, next) {
    /*
    User.findOne({}, function(err, doc) { // use call back function
      if (err) {
        return res.send('Error retrieving data!');
      }
      res.render('node', {email: doc.email});
    });
    */
    res.render('index');
});

/*
router.post('/', function (req, res, next) {
    var email = req.body.email;
    var user = new User({
      firstName: 'Bambrow',
      lastName: 'Li',
      password: 'password',
      email: email
    });
    user.save(); // save to the database
    res.redirect('/');
});
*/

/*
 // encode msg to be variable
router.get('/message/:msg', function (req, res, next) {
    res.render('node', {message: req.params.msg}); // extract from the request parameters encoded in URL
});

router.post('/message', function (req, res, next) {
  var message = req.body.message; // extract from the request body, here we extract 'message'
  res.redirect('/message/' + message); // redirect to a get route
});
*/

// exports the router
module.exports = router;
