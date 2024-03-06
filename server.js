const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 5000;

// var io = require('socket.io')(http, {
//     cors: {
//         origin: "*"
//     }
// });

//DIRECT TO INDEX.HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//LISTEN FROM PORT?
server.listen(port, function () {
    console.log(`Server started on port: ${port}`);
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


        if (data == "onAmericanDinner_StyleFullViewScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onAmericanDinner_StyleFullViewScene');
            console.log("! setUnityPlatFrom/onAmericanDinner_StyleFullViewScene");
        }
        if (data == "onAnimalParty_StyleFullViewScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onAnimalParty_StyleFullViewScene');
            console.log("! setUnityPlatFrom/onAnimalParty_StyleFullViewScene");
        }
        if (data == "onTechnoShowOff_StyleFullViewScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onTechnoShowOff_StyleFullViewScene');
            console.log("! setUnityPlatFrom/onTechnoShowOff_StyleFullViewScene");
        }
        if (data == "onThailand_StyleFullViewScene") {
            socket.broadcast.emit('setUnityPlatFrom', 'onThailand_StyleFullViewScene');
            console.log("! setUnityPlatFrom/onThailand_StyleFullViewScene");
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


//THROW ERROR WHEN GET SOME ERROR
io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});