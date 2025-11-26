const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true }, // must be unique
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dp: { type: String, default: null } // profile picture
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
