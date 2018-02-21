module.exports = function (io) {

    var express = require('express');
    var router = express.Router();

    let Persons = require('../models/Person.js');


    //post the calculation to the database
    router.post('/', function (req, res) {
        console.log('here')
        console.log('user', req.params.id);
        var messToAdd = new Messas(req.body);
        console.log('test', testToAdd ) //renaming to work with mongoose
        Messas.save(function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200)
                // Emit the event
                io.emit("message", req.body)
            }
        }); // END SAVE
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

    // router.get('/', function (req, res) {
    //     res.sendFile(__dirname + '/public/index.html');
    // });

    return router;
}
