const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const iconCategory = {
  家居物業: '<i class="fas fa-home"></i>',
  交通出行: '<i class="fas fa-shuttle-van"></i>',
  休閒娛樂: '<i class="fas fa-grin-beam"></i>',
  餐飲食品: '<i class="fas fa-utensils"></i>',
  其他: '<i class="fas fa-pen"></i>'
}


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
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
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

app.post('/records', (req, res) => {
  const name = req.body.name
  const date = req.body.date
  const amount = req.body.amount
  const category = req.body.category
  const icon = iconCategory[category]

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
  const icon = iconCategory[category]

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