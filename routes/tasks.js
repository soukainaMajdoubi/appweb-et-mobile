const express = require('express');
const db = require('../data-layer');
const {auth} = require('../middlewares')
const route = express.Router();



route.get('/tasks/:listId' , function(req, res) { 
  console.log(req.params.listId)
  db.getTasks(req.params.listId, function(error, tasks) {
    console.log({error,tasks})
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: tasks
    });
  });
});

route.post('/tasks',function(req, res) {
  console.log(req.body.listId)
  if (!req.body || !req.body.name) {
    return res.json({success: false, error: 'name is missing!'});
  }
  const task = {
    listId: req.body.listId,
    name: req.body.name,
    done: req.body.done
  }
 
  db.insertTask(task, function(error, task) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: task
    });
  });
});

route.put('/tasks/:id', function(req, res) {
  
  if (!req.body || (!req.body.name && !req.body.done)) {
    return res.json({success: false, error: 'nothing to update!'});
  }
  let data = {}
  if (req.body.name) {
    data.name = req.body.name
  }
  if (req.body.done) {
    data.done = req.body.done
  }
  db.updateTask(req.params.id, data, function(error, task) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({
      success: true,
      data: task
    });
  });
});

route.delete('/tasks/:id', auth, function(req, res) {
  db.deleteTask(req.params.id, function(error) {
    if (error) {
      return res.json({success: false, error: error});
    }
    res.json({success: true});
  });
});

module.exports = route