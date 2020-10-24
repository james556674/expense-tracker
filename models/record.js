const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    require: true
  }
})
module.exports = mongoose.model('Record', recordSchema)