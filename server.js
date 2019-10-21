const http = require('http');
const express = require('express');
let app = express();

  app.use(express.static(__dirname+'/public'));
  app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');