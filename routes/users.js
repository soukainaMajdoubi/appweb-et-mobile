const express = require('express');
const db = require('../data-layer');
const {auth} = require('../middlewares');
const route = express.Router();

route.post('/users', function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.json({success: false, error: 'some data is missing!'});
  }
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  db.insertUser(user, function(error, user) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: user
    });
  });
});

module.exports = route