const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String },
    created_at: { type: Date, required: true, default: Date.now },
    posted_by: { type: String },
    image: { type: String },
    messagePicture: { type: String },
    heart: { type: Number, default: 0 },
    thumbs_up: { type: Number, default: 0 },
    thumbs_down: { type: Number, default: 0 },
    smile: { type: Number, default: 0 }
})

//could create an empty array and push userIDs of votes into - loop through
//each time and check if that user has already voted?
//or each vote type can be it's own object with properties of a number of votes
//and also a list of who has voted and is returned in the get request

module.exports = mongoose.model('Message', MessageSchema);
