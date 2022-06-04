const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 5000;
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  // when a client connects.
  console.log(io.sockets)
  io.emit('new connect', 'A new user connected!');

  socket.on('chat message', (msg) => {
    io.emit(`chat message`, msg);
  })

  // when socket/client disconnects
  socket.on('disconnect', () => console.log('user disconnected'));
})

server.listen(PORT, ()=> {
  console.log(`listening on ${PORT}`)
})