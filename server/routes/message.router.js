    module.exports = function (io) {

        var express = require('express');
        var router = express.Router();

        var mongoose = require('mongoose');

        // var Schema = mongoose.Schema;

        let Persons = require('../models/Person.js');
        let Message = require('../models/Message.js')
        //post the calculation to the database
        router.post('/', function (req, res) {
            if (req.isAuthenticated) {
            console.log(req.user.id)            
            var messageToSave = new Message(req.body);
            messageToSave.posted_by = req.user.username;
            console.log(messageToSave.posted_by);
                console.log('the whole thing', messageToSave)
                messageToSave.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200)
                        //Emit the event
                        io.emit("message", messageToSave)
                    }
                }); // END SAVE
        }//end if authenticated
            else {
                console.log('User is not authenticated.')
            }
        }); // END POST Route

    // //get the last 10 records
    // router.get('/', function (req, res) {
    //     Calcs.find({}).sort({ _id: -1 }).limit(10).exec(function (err, calcs) { //finding chats
    //         if (err) {
    //             console.log("ERROR!", err);
    //             res.sendStatus(500);
    //         } else {
    //             console.log('tests', calcs)
    //             res.send(calcs);

    //         }
    //     }); // END FIND
    // }); // END GET Route

        router.get('/', function (req, res) {
            res.sendFile(__dirname + '/public/index.html');
        });

        return router;
    }
