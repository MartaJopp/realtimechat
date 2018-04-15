const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser'); // require body-parser
const http = require("http").Server(app)
const io = require("socket.io").listen(server)
const messageRouter = require('./routes/message.router.js')(io); // accesses router


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
