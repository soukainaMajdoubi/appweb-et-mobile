const express = require('express');
const db = require('../data-layer');
const {auth} = require('../middlewares');
const route = express.Router();

route.get('/lists', auth, function(req, res) {
  db.getLists(req.user.id, function(error, lists) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: lists
    });
  });
});

route.post('/lists', auth, function(req, res) {
  if (!req.body || !req.body.name) {
    return res.json({success: false, error: 'name is missing!'});
  }
  const list = {
    userId: req.user.id,
    name: req.body.name
  }
  db.insertList(list, function(error, list) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: list
    });
  });
});

route.put('/lists/:id', auth, function(req, res) {
  if (!req.body || (!req.body.name )) {
    return res.json({success: false, error: 'nothing to update!'});
  }
  let data = {}
  if (req.body.name) {
    data.name = req.body.name
  }
 
  db.updateList(req.params.id, data, function(error, list) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: list
    });
  });
});

route.delete('/lists/:id', function(req, res) {
  db.deleteList(req.params.id, function(error) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({success: true});
  });
});

module.exports = route