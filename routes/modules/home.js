const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {

  let totalAmount = 0

  Record.find()
    .lean()
    .then(records => {
      //sum total amount
      records.forEach(record => {
        totalAmount += record.amount
      })

      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error)) // 
})

module.exports = router