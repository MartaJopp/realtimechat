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
            console.log('user id', req.user.id)
            console.log('messageid', req.params.id)
            console.log('body', req.body)  
            var user = req.user.id;
            Message.update({ "_id": req.params.id },
                ({
                    $addToSet:
                        { "smile.byWho": user }
                },
            {$inc: {
               "smile.votes": 1}}
                ),
              
            
            function (err, smileUpdate) {
                        if (err) {
                            console.log("ERROR!", err);
                            res.sendStatus(500);
                        } else {
                    
                    res.sendStatus(204)
                    console.log('success')
                    io.emit("smileVotes", smileUpdate)
                   
                        }
              }) //end find one
                  
        } //end if authenticated
 
        else {
            console.log('User is not authenticated')
        }//end not authenticated
    
    })//end update votes


    return router;
}
