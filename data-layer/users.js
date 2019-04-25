const {ObjectID} = require('mongodb');
const {client} = require('./database');

const users = () => client.db().collection("users");

function insertUser(user, cb) {
  users().insertOne(user, cb);
}

function getUser(user, cb) {
  users().findOne(user, cb);
}

function getUsers(cb) {
  users().find({}).toArray(cb);
}

module.exports = {
  insertUser,
  getUsers,
  getUser
}