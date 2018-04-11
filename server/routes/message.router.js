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

    //update votes
    router.put('/:id', function (req, res) {
        if (req.isAuthenticated) {
            console.log('user id', req.user.id)
            console.log('messageid', req.params.id)
            console.log('body', req.body)  
            
           

            Message.update({ "_id": req.params.id },
           {$inc: {
               "smile.votes": 1}},
            
            function (err, smileUpdate) {
                        if (err) {
                            console.log("ERROR!", err);
                            res.sendStatus(500);
                        } else {
//                                 {$inc: {
// smileUpdate: {
//     smile: {
//         votes: 1
//     }
// } }
//                                 }

// console.log('vote Update', voteUpdate)
// console.log('smile update', smileUpdate)
                    
                                // smileUpdate.save(function (err, smileUpdate) {
                        
                            // io.emit("smileVotes")
                                }
                          
                    
                    // res.sendStatus(204)
                    // console.log('success')
                    // io.emit("smileVotes", Message.smile)
                    //     }
                    //     )
                    // }
                        }) //end find one
                    
        } //end if authenticated
 
        else {
            console.log('User is not authenticated')
        }//end not authenticated
    
    })//end update votes


    return router;
}
