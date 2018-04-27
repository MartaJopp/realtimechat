const mongoose = require('mongoose');

const Schema = mongoose.Schema;


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
        votes: { type: Number, default: 0 },
        byWho: { type: Array }
    },
    smile: {
        votes: { type: Number, default: 0 },
        byWho: { type: Array }
    }
})


module.exports = mongoose.model('Message', MessageSchema);
