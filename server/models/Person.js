const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String },
  date: { type: Date, default: Date.now() }
})

const Message = mongoose.model('Message', MessageSchema)
// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  message: [MessageSchema]
});



module.exports = mongoose.model('Person', PersonSchema);
