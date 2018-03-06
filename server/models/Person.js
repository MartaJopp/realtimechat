const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  birthday: { type: Date },
  city: { type: String },
  occupation: {type: String},
  profilePicture: { type: String }
});



module.exports = mongoose.model('Person', PersonSchema);
