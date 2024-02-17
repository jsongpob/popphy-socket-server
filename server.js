var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});
var express = require('express')

//DIRECT TO INDEX.HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})


//THROW ERROR WHEN GET SOME ERROR
io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

//LISTEN FROM PORT?
http.listen(3000, function () {
    console.log('listening on *:3000');
});


//SOCKET ON WITH 'CHANNEL' WHEN OPEN 'CONNECTION'
io.on('connection', (socket) => {
    console.log(`+ Device ${socket.id} connected`); // connection devices

    //WHEN CLIENT DISCONNECT FROM SOCKET
    socket.on('disconnect', () => {
        console.log(`- ${socket.id} disconnected`);
    });

    //CHANNELS SOCKET
    //RECEIVE FROM CLIENT SOCKET ON 'channel_platfrom' CHANNEL
    socket.on('channel_platfrom', (data) => {
        // console.log('channel_platfrom: ' + data);

        if (data == "connect") {
            console.log("function running");
            socket.emit('client', 'hello client'); //SENT BACK TO CLIENT ON 'client' CHANNEL
            socket.broadcast.emit('test', 'world'); //BROADCAST TO ALL CLIENT OPEN WITH 'test'
        }

        if (data == "onPreviewScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onPreviewScene');
            console.log("! setUnityPlatFrom/onPreviewScene");
        }
        if (data == "onListStyleScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onListStyleScene');
            console.log("! setUnityPlatFrom/onListStyleScene");
        }
        if (data == "onStyleSelectedScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onStyleSelectedScene');
            console.log("! setUnityPlatFrom/onStyleSelectedScene");
        }
        if (data == "onStyleFullViewScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onStyleFullViewScene');
            console.log("! setUnityPlatFrom/onStyleFullViewScene");
        }
        if (data == "onPreviewCaptureScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onPreviewCaptureScene');
            console.log("! setUnityPlatFrom/onPreviewCaptureScene");
        }

        if (data == "onCaptureGIF") {
            socket.broadcast.emit('setUnityPlatFrom', 'onCaptureGIF');
            console.log("!!! setUnityPlatFrom/onCaptureGIF");
        }
    });
});