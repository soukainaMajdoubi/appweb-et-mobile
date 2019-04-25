const expressJWT = require('express-jwt');
const {KEY} = require('./config');

const auth = expressJWT({secret: KEY})

module.exports = {auth}