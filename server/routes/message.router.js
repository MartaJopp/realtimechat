module.exports = function (io) {

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');

    // var Schema = mongoose.Schema;

    let Persons = require('../models/Person.js');
    let Message = require('../models/Message.js')

    //post the message to the database
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
            Message.find({
                "created_at": {
                    $lt: new Date(),
                    $gte: new Date(new Date().setDate(new Date().getDate() - 14))
                }
            }).sort({ _id: -1 }).exec(function (err, messages) {
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

    router.put('/:id', function (req, res) {
        if (req.isAuthenticated) {
            console.log('username', req.user.username)
            console.log('messageid', req.params.id)
            console.log('body', req.body)
            var user = req.user.username;
            var id = req.params.id
            var voteType = req.body.voteType
            if (voteType == 'smile') {
                addSmile(req, res, id, user)
            }
            if (voteType == 'thumbsUp') {
                addThumbsUp(req, res, id, user)
            }
            if (voteType == 'thumbsDown') {
                addThumbsDown(req, res, id, user)
            }
            if (voteType == 'heart') {
                addHeart(req, res, id, user)
            }
        } //end if authenticated
        else {
            console.log('User is not authenticated')
        }//end not authenticated
    })//end update votes

    //adds smile vote    
    function addSmile(req, res, id, user) {
        Message.update({ "_id": id },
            ({
                $addToSet:
                    { "smile.byWho": user }
            }
            ),
            function (err, success) {
                if (err) {
                    console.log("ERROR!", err)
                    res.sendStatus(500);
                }
                else {
                    Message.update({ "_id": id },
                        ({
                            $inc:
                                { "smile.votes": 1 }
                        }
                        ),
                        function (err, message) {
                            if (err) {
                                console.log("ERROR!", err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(204)
                                console.log('success')
                                io.emit("smileVotes", message) //sends back that a change occurred
                            } // end else
                        })//end find one
                }
            })//end first message update  
    }
    //end addSmile function

    //addThumbsUp function
    function addThumbsUp(req, res, id, user) {
        Message.update({ "_id": id },
            ({
                $addToSet:
                    { "thumbs_up.byWho": user }
            }
            ),
            function (err, success) {
                if (err) {
                    console.log("ERROR!", err)
                    res.sendStatus(500);
                }
                else {
                    Message.update({ "_id": id },
                        ({
                            $inc:
                                { "thumbs_up.votes": 1 }
                        }
                        ),
                        function (err, message) {
                            if (err) {
                                console.log("ERROR!", err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(204)
                                console.log('success')
                                io.emit("smileVotes", message) //sends back that a change occurred
                            } // end else
                        })//end find one
                }
            })//end first message update  
    }
    //end add thumbsUp function

    //ThumbsDown adds one vote
    function addThumbsDown(req, res, id, user) {
        Message.update({ "_id": id },
            ({
                $addToSet:
                    { "thumbs_down.byWho": user }
            }
            ),
            function (err, success) {
                if (err) {
                    console.log("ERROR!", err)
                    res.sendStatus(500);
                }
                else {
                    Message.update({ "_id": id },
                        ({
                            $inc:
                                { "thumbs_down.votes": 1 }
                        }
                        ),
                        function (err, message) {
                            if (err) {
                                console.log("ERROR!", err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(204)
                                console.log('success')
                                io.emit("smileVotes", message) //sends back that a change occurred
                            } // end else
                        })//end find one
                }
            })//end first message update  
    }

    //add heart vote function
    function addHeart(req, res, id, user) {
        Message.update({ "_id": id },
            ({
                $addToSet:
                    { "heart.byWho": user }
            }
            ),
            function (err, success) {
                if (err) {
                    console.log("ERROR!", err)
                    res.sendStatus(500);
                }
                else {
                    Message.update({ "_id": id },
                        ({
                            $inc:
                                { "heart.votes": 1 }
                        }
                        ),
                        function (err, message) {
                            if (err) {
                                console.log("ERROR!", err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(204)
                                console.log('success')
                                io.emit("smileVotes", message) //sends back that a change occurred
                            } // end else
                        })//end find one
                }
            })//end first message update  
    }
    //end add heart function

    return router;
}
