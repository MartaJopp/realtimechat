const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// const SmileSchema = new Schema({
//     votes: { type: Number, default: 0 },
//     byWho: { type: Array }
// })

// var Smile = mongoose.model('Smiles', SmileSchema);


//w/ SmileSchema
const MessageSchema = new Schema({
    message: { type: String },
    created_at: { type: Date, required: true, default: Date.now },
    posted_by: { type: String },
    image: { type: String },
    messagePicture: { type: String },
    heart: {
        votes: { type: Number, default: 0 },
        byWho: { type: Array }
    },
    thumbs_up: {
        votes: { type: Number, default: 0 },
        byWho: { type: Array }
    },
    thumbs_down: { 
        votes: {type: Number, default: 0 },
        byWho: {type: Array}
    },
    smile: {
        votes: {type: Number, default: 0},
        byWho: {type: Array}
    }
})

//original MessageSchema
// const MessageSchema = new Schema({
//     message: { type: String },
//     created_at: { type: Date, required: true, default: Date.now },
//     posted_by: { type: String },
//     image: { type: String },
//     messagePicture: { type: String },
//     heart: { type: Number, default: 0 },
//     thumbs_up: { type: Number, default: 0 },
//     thumbs_down: { type: Number, default: 0 },
//     smile: { type: Number, default: 0 }
// })

//could create an empty array and push userIDs of votes into - loop through
//each time and check if that user has already voted?
//or each vote type can be it's own object with properties of a number of votes
//and also a list of who has voted and is returned in the get request:
//heart: { 
//        votes: {type: Number, default: 0},
//        byWho: {type: Array}
//}
// OR
// create a schemas inside of the message schema, so 
//var HeartSchema = new Schema({
// id: {type: String, required: true, index: {unique: true}},
// votes: { type: Number},
// whovoted: {type: array}
// });
//and then above it would be heart: [HeartSchema]
// var Heart = mongoose.model('Hearts', HeartSchema);
//this schema would go above the Message Schema

module.exports = mongoose.model('Message', MessageSchema);
