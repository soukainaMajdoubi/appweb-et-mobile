const {init} = require('./database');
const tasks = require('./tasks');
const lists = require('./lists');
const users = require('./users');

module.exports = Object.assign({init: init}, tasks, users, lists);
