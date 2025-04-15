const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('chat message', (msg) => {
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
