const Record = require('../record')
const records = require('./data/records.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(records.results)

  console.log('done')
})