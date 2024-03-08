const mysql = require('mysql');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const port = 3000;

var filepathfromUnity = "";

// var io = require('socket.io')(http, {
//     cors: {
//         origin: "*"
//     }
// });

//DIRECT TO INDEX.HTML
//______________________HOME___________________________
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
})

//____________________STYLE_LIST_______________________
app.get('/list-of-styles', (req, res) => {
    res.sendFile(__dirname + '/public/style_list.html');
})

//___________________PREVIEW_SCENE_____________________
//To American Dinner Preview
app.get('/preview-ad-theme', (req, res) => {
    res.sendFile(__dirname + '/public/styles_list/american_dinner.html');
})
//To Animal Party Preview
app.get('/preview-ap-theme', (req, res) => {
    res.sendFile(__dirname + '/public/styles_list/animal_party.html');
})
//To Hello Welcome Preview
app.get('/preview-hw-theme', (req, res) => {
    res.sendFile(__dirname + '/public/styles_list/hello_welcome.html');
})
//To Techno Showoff Preview
app.get('/preview-ts-theme', (req, res) => {
    res.sendFile(__dirname + '/public/styles_list/techno_showoff.html');
})

//___________________ON_PLAYING_______________________
//To Playing American Dinner
app.get('/playing-ad', (req, res) => {
    res.sendFile(__dirname + '/public/playing/playing_ad.html');
})
//To Playing Animal Party
app.get('/playing-ap', (req, res) => {
    res.sendFile(__dirname + '/public/playing/playing_ap.html');
})
//To Playing Hello Welcome
app.get('/playing-hw', (req, res) => {
    res.sendFile(__dirname + '/public/playing/playing_hw.html');
})
//To Playing Techno Showoff
app.get('/playing-ts', (req, res) => {
    res.sendFile(__dirname + '/public/playing/playing_ts.html');
})

//___________________CAPTURING_______________________
app.get('/captured', (req, res) => {
    res.sendFile(__dirname + '/public/captured.html');
})
//To Captured American Dinner
app.get('/captured-ad', (req, res) => {
    res.sendFile(__dirname + '/public/captured/captured_ad.html');
})
//To Captured Animal Party
app.get('/captured-ap', (req, res) => {
    res.sendFile(__dirname + '/public/captured/captured_ap.html');
})
//To Captured Hello Welcome
app.get('/captured-hw', (req, res) => {
    res.sendFile(__dirname + '/public/captured/captured_hw.html');
})
//To Captured Techno Showoff
app.get('/captured-ts', (req, res) => {
    res.sendFile(__dirname + '/public/captured/captured_ts.html');
})

//___________________END_______________________
app.get('/end', (req, res) => {
    res.sendFile(__dirname + '/public/end.html');
})

//USE PUBLIC FOLDER
app.use("/public", express.static(__dirname + "/public"));

//LISTEN FROM PORT?
server.listen(port, function () {
    console.log(`Server started on port: ${port}`);
});

//SOCKET ON WITH 'CHANNEL' WHEN OPEN 'CONNECTION'
io.on('connection', (socket) => {
    console.log(`+ ${socket.id} connected`); // connection devices

    //WHEN CLIENT DISCONNECT FROM SOCKET
    socket.on('disconnect', () => {
        console.log(`- ${socket.id} disconnected`);
    });

    //CHANNELS SOCKET
    //______RECEIVE FROM CLIENT SOCKET ON 'channel_data' CHANNEL
    socket.on('channel_data', (data) => {
        console.log(data);
    });


    //______RECEIVE FROM CLIENT SOCKET ON 'channel_platfrom' CHANNEL
    socket.on('channel_platfrom', (data) => {
        // console.log('channel_platfrom: ' + data);

        //CLICENT CONNECT
        if (data == "connect") {
            console.log("function running");
            socket.emit('client', 'hello client'); //SENT BACK TO CLIENT ON 'client' CHANNEL
            socket.broadcast.emit('test', 'world'); //BROADCAST TO ALL CLIENT OPEN WITH 'test'
        }

        //PREVIEW IDLE
        if (data == "onPreviewIDLE") {
            socket.broadcast.emit('setUnityPlatFrom', 'onPreviewidle');
            console.log("-----> send to unity: onPreviewidle (Preview Idle)");
        }

        //LIST OF STYLES
        if (data == "selectListOfStyle") {
            socket.broadcast.emit('setUnityPlatFrom', 'selectedListOfStyle');
            console.log("-----> send to unity: selectedListOfStyle (List Of Style)");
        }

        //__________PREVIEW_THEME__________
        //American Dinner
        if (data == "selectADpreview") {
            socket.broadcast.emit('setUnityPlatFrom', 'selectedADpreview'); //UNITY
            console.log("-----> send to unity: selectedADpreview (Preview Theme)");
        }
        //Animal Party
        if (data == "selectAPpreview") {
            socket.broadcast.emit('setUnityPlatFrom', 'selectedAPpreview'); //UNITY
            console.log("-----> send to unity: selectedAPpreview (Preview Theme)");
        }
        //Hello Welcome
        if (data == "selectHWpreview") {
            socket.broadcast.emit('setUnityPlatFrom', 'selectedHWpreview'); //UNITY
            console.log("-----> send to unity: selectedHWpreview (Preview Theme)");
        }
        //Techno Showoff
        if (data == "selectTSpreview") {
            socket.broadcast.emit('setUnityPlatFrom', 'selectedTSpreview'); //UNITY
            console.log("-----> send to unity: selectedTSpreview (Preview Theme)");
        }

        //______FULL_VIEW_OF_THEME______
        //American Dinner
        if (data == "goADfull") {
            socket.broadcast.emit('setUnityPlatFrom', 'goADfull'); //UNITY
            console.log("-----> send to unity: goADfull (Full View)");
        }
        //Animal Party
        if (data == "goAPfull") {
            socket.broadcast.emit('setUnityPlatFrom', 'goAPfull'); //UNITY
            console.log("-----> send to unity: goAPfull (Full View)");
        }
        //Hello Welcome
        if (data == "goHWfull") {
            socket.broadcast.emit('setUnityPlatFrom', 'goHWfull'); //UNITY
            console.log("-----> send to unity: goHWfull (Full View)");
        }
        //Techno Showoff
        if (data == "goTSfull") {
            socket.broadcast.emit('setUnityPlatFrom', 'goTSfull'); //UNITY
            console.log("-----> send to unity: goTSfull (Full View)");
        }

        //______PREVIEW_CAPTURED______
        if (data == "previewCaptured") {
            socket.broadcast.emit('setUnityPlatFrom', 'previewCaptured'); //UNITY
            console.log("-----> send to unity: previewCaptured (Preview Captured)");
        }

        //______START_CAPTURE_________
        if (data == "startCapture") {
            socket.broadcast.emit('setUnityPlatFrom', 'startCapture'); //UNITY
            console.log("-----> send to unity: startCapture (Start Capture)");
        }

        //_________END_________
        if (data == "onEnd") {
            socket.broadcast.emit('setUnityPlatFrom', 'onEnd'); //UNITY
            console.log("-----> send to unity: onEnd (End Scene)");
        }

        //_________UPLOAD_FILES_TO_DATABASE_________
        if (data == "uploadFileNow") {
        }
    });
});

//TESTING
app.get('/testing', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//THROW ERROR WHEN GET SOME ERROR
io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});


//_______DATABASE_________
// app.use(express.json());

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'arts',
//     port: ''
// })

// connection.connect((err) => {
//     if (err) {
//         console.log('Error connecting to MySQL database = ', err)
//         return;
//     }
//     console.log('[database] MySQL successfully connected!');
// })

// //CREATE NEW TO DATABASE
// app.post("/create-test", async (req, res) => {
//     const { filepath, accept } = req.body;

//     try {
//         connection.query(
//             "INSERT INTO popphy(filepath, accept) VALUES(?, ?)",
//             [filepath, accept],
//             (err, result, fields) => {
//                 if (err) {
//                     console.log("Error while inserting to database", err);
//                     return res.status(400).send();
//                 }
//                 return res.status(200).json({ message: "New file added to database successfully"})
//             }
//         )
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

// app.get("/read-test", async (req, res) => {
//     try {
//         connection.query("SELECT * FROM popphy", (err, result, fields) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.status(200).json(result);
//         })
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })


// app.get('/photos', (req, res) => {
//     res.sendFile(__dirname + '/public/previews/index.php');
// })


// //SCAN TO DOWNLOAD PHOTO PAGE
// //______________________HOME___________________________
// app.set('view engine', 'ejs')
// app.get('/photos-ejs', (req, res) => {
//     res.render('index', {
//         user: user
//     })
// })

