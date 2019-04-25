const express = require('express');
const db = require('../data-layer');
const jwt = require('jsonwebtoken');
const {KEY} = require('../config');
const route = express.Router();

route.post('/auth', function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.json({success: false, error: 'some data is missing!'});
  }
  const data = {
    username: req.body.username,
    password: req.body.password
  };
  db.getUser(data, function(error, user) {
    if (error) {
      return res.json({success: false, error});
    }
    if (user == null) {
      return res.json({success: false, error: 'Utilisateur inconnu'});
    }
    const token = jwt.sign({id: user._id}, KEY);
    res.json({success: true, data: {token}});
  });
});

module.exports = route