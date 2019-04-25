const {ObjectID} = require('mongodb');
const {client} = require('./database');

const tasks = () => client.db().collection("tasks")


function getTasks(listId, cb) {
  console.log(listId)
  tasks().find({listId: listId}).toArray(cb);
}

function insertTask(task, cb) {
  tasks().insertOne(task, cb);
}
function updateTask(id, data, cb) {
  const ident = {_id : new ObjectID(id)};
  tasks().updateOne(ident, {$set: data}, cb);
}

function deleteTask(id, cb) {
  const ident = {_id : new ObjectID(id)};
  tasks().deleteOne(ident, cb);
}

module.exports = {
  insertTask: insertTask,
  updateTask: updateTask,
  deleteTask: deleteTask,
  getTasks
}