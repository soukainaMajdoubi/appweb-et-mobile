const {ObjectID} = require('mongodb');
const {client} = require('./database');

const lists = () => client.db().collection("lists");

function getLists(userId, cb) {
  lists().find({userId: userId}).toArray(cb);
}

function insertList(list, cb) {
  lists().insertOne(list, cb);
}

function deleteList(id, cb) {
  const ident = {_id : new ObjectID(id)};
  lists().deleteOne(ident, cb);
}
function updateList(id, data, cb) {
  const ident = {_id : new ObjectID(id)};
  lists().updateOne(ident, {$set: data}, cb);
}
module.exports = {
  insertList: insertList,
  deleteList: deleteList,
  updateList:updateList,
  getLists
}