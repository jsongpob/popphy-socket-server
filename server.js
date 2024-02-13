var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});
var express = require('express')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log(`+ Device ${socket.id} connected`);

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

http.listen(80, function () {
    console.log('listening on *:3000');
});