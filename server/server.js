var express = require("express")
var mongoose = require("mongoose")
var app = express()
var server = require('http').createServer(app);
var PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser'); // require body-parser
var http = require("http").Server(app)
var io = require("socket.io").listen(server)
var messageRouter = require('./routes/message.router.js')(io); // accesses router


const passport = require('./strategies/user.strategy');
const sessionConfig = require('./modules/session-middleware');

//DB Module
const db = require('./modules/db.config.js');

// Route includes
const userRouter = require('./routes/user.router.js');
// const messageRouter = require('./routes/message.router.js')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files
app.use(express.static('server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/message', messageRouter);




io.on("connection", (socket) => {
    console.log("Socket is connected...")
})

/** Listen * */
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
