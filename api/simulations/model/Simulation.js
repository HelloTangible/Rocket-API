const mongoose = require('mongoose')
const Schema = mongoose.Schema

const simulationModel = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

module.exports = mongoose.model('Simulation', simulationModel)
