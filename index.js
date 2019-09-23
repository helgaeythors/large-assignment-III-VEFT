// Here the web service is setup and routes declared
const artService = require('./services/artService');
const express = require('express');
const app = express();

// get all arts
app.get('/api/arts', function (req, res) {
   // TODO
   return res.json(artService.getAllArts());
});

// TODO setup routes

// http://localhost:3000
app.listen(3000, function() {
   console.log("Server is listening on port 3000");
});