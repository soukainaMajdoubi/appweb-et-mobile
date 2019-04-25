const {DB} = require('../config')
const {MongoClient} = require('mongodb');
const client = new MongoClient(DB, {useNewUrlParser:true});

function init(cb) {
  client.connect(function(err) {
    console.log('Init')
    if (err) throw err;
    cb();
  });
}

module.exports = {
  init: init,
  client: client
}