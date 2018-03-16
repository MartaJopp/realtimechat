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
            console.log('reqbody', req.body)
            var messageToSave = new Message(req.body);
            messageToSave.posted_by = req.user.username;
            messageToSave.image = req.user.profilePicture;
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

    //get the messages
    router.get('/', function (req, res) {
        if (req.isAuthenticated) {

            //find chats - sort by most recent
            Message.find({}).sort({ _id: -1 }).exec(function (err, messages) {
                if (err) {
                    console.log("ERROR!", err);
                    res.sendStatus(500);
                } else {
                    console.log('messages', messages)
                    res.send(messages);
                }
            }); // END FIND
        } // end if authenticated
        else {
            console.log('User is not authenticated.')
        }
    }); // END GET Route

    //add smile vote 
    //need to create a schema with user id, message id and type of vote
    //then on get messages --> also need to get vote types and do ng-show
    //or hide depending on vote status, change class to different if 
    //already been voted so cursor is not a pointer
    //so upon voting --> a post will go to the other schema and an update to
    //the message schema
    router.put('/:id', function (req, res) {
        if (req.isAuthenticated) {
            console.log('user id', req.user.id)
            console.log('messageid', req.params.id)
            console.log('body', req.body)
            let smileUpdate = req.body
            Message.update({ "_id": req.params.id }, {
                $inc: { "smile": 1 }
            }, function (err, smileUpdate) {
                if (err) {
                    console.log("Error received updating person.", err);
                    res.sendStatus(500);
                } else {
                    Message.find({ "_id": req.params.id }).exec(function (err, message) {
                        if (err) {
                            console.log("ERROR!", err);
                            res.sendStatus(500);
                        } else {
                            console.log('what found', message[0].smile)
                            var toSend = {
                                smiles: message[0].smile,
                                id: message[0]._id
                            }
                            io.emit("smileVotes", toSend)
                        }
                    }); // END FIND
                    // res.sendStatus(204)
                    // console.log('success')
                    // io.emit("smileVotes", Message.smile)

                };
            }) //end update
        } //end if authenticated
        else {
            console.log('User is not authenticated')
        }//end not authenticated
    })//end update votes

    return router;
}
