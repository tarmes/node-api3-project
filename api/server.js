const express = require('express');
const middlewares = require('../middlewares/middlewares')
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.use(middlewares.logger)
server.use(express.json())

module.exports = server;
