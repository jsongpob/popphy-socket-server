// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//     console.log(`${socket.id} user connected`);

//     socket.on('disconnect', () => {
//       console.log(`${socket.id} disconnected`);
//     });

//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//         console.log('message: ' + msg);
//     });

//     io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
//     socket.broadcast.emit('hi');

//   });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });

// const express = require('express');
const { createServer } = require('http');
const { join } = require('node:path');
const { Server } = require('socket.io');

// const app = express();
const server = createServer();
const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });


io.on('connection', (socket) => {
    console.log(`+ ${socket.id} user connected`);

    socket.on('disconnect', () => {
        console.log(`- ${socket.id} disconnected`);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
});

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });