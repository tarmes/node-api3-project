const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[timestamp: ${new Date().toISOString()}] method: ${req.method}, url: ${req.url}, `)
  next()
}

server.use(logger)
server.use(express.json())

module.exports = server;
