const express = require('express');
const bodyParser = require('body-parser');
const dataLayer = require('./data-layer');
const routes = require('./routes');
const app = express();

// Initialize JSON and Form data parsers
app.use(bodyParser.json()); // to support Json encoded bodies
app.use(bodyParser.urlencoded({extended:true})); // to support URL encoded bodies

app.use(express.static(__dirname + '/public'));

app.use(function (req , res , next){
  console.log(req.url,req.body)
  next()
});
for (const route of routes)
  app.use('/api', route);

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

dataLayer.init(function() {
  app.listen(process.env.PORT || 3000);
  console.log('Listening on port 3000');
});
