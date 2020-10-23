const express = require('express')
const mongoose = require('mongoose')


const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('this is a expense-tracker')
})

app.listen(port, () => {
  console.log(`this express is running on http://localhost:${port}`)
})