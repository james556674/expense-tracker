const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const iconList = require('./models/seeds/data/iconList.json')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

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

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.post('/filter', (req, res) => {
  let categorys = req.body.category

  Record.find()
    .lean()
    .then(records => {

      records = records.filter((record) =>
        record.category.toLowerCase().includes(categorys)
      )

      res.render('index', { records })
    })
    .catch(error => console.error(error)) // 
})

app.post('/records', (req, res) => {
  const name = req.body.name
  const date = req.body.date
  const amount = req.body.amount
  const category = req.body.category
  const icon = iconList.results[0][category]

  return Record.create({ name, date, amount, category, icon })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const date = req.body.date
  const amount = req.body.amount
  const category = req.body.category
  const icon = iconList.results[0][category]

  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.category = category
      record.icon = icon
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`this express is running on http://localhost:${port}`)
})