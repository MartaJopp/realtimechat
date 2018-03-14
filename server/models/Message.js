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


module.exports = mongoose.model('Message', MessageSchema);
