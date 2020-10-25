const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const iconList = require('../../models/seeds/data/iconList.json')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.post('/filter', (req, res) => {
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

router.post('/', (req, res) => {
  const name = req.body.name
  const date = req.body.date
  const amount = req.body.amount
  const category = req.body.category
  const icon = iconList.results[0][category]

  return Record.create({ name, date, amount, category, icon })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router