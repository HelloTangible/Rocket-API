const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
  email: { type: String, required: false },
  email_verified: { type: Boolean, required: true, default: false },
  name: { type: String, required: false },
  picture: { type: String, required: false },
  admin: { type: Boolean, required: true },
  user_id: { type: String, required: false, index: { unique: true } }
})

module.exports = mongoose.model('User', userModel)
