const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String },
    created_at: { type: Date, required: true, default: Date.now },
    posted_by: { type: String },
    image: {type: String}
})


module.exports = mongoose.model('Message', MessageSchema);
