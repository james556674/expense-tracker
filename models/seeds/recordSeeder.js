const mongoose = require('mongoose')
const Record = require('../record')
const records = require('./data/records.json')

mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Record.create(records.results)

  console.log('done')
})