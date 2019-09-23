// Here the web service should is setup and routes declared
const express = require('express');
const app = express();

app.listen(3000, function() {
   console.log("Server is listening on port 3000");
});