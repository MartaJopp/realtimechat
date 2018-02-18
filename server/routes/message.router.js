module.exports = function (io) {

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var MessageSchema = new Schema({
        message: String,
    });

    var Messages = mongoose.model('Messages', MessageSchema, 'messages');

    //post the calculation to the database
    router.post('/', function (req, res) {
        if (req.isAuthenticated()) {

        // console.log('what is io', io)
        console.log('user', req.user.username)
        console.log('what was sent', req.body);
        // var message = new Messages(req.body);
        // console.log('test', testToAdd ) //renaming to work with mongoose
        // message.save(function (err, data) {
        //     if (err) {
        //         console.log(err);
        //         res.sendStatus(500);
        //     } else {
        //         res.sendStatus(200)
        //         //Emit the event
                io.emit("message", req.body)
        //     }
        // }); // END SAVE
    }//end if autthenticated
    else {
        console.log('User is not authenticated')
    }//not authenticated
    }); // END POST Route

    router.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    return router;
}