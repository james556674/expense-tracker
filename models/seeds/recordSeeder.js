const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Record.create(
    {
      name: "午飯",
      date: "2020-10-23",
      amount: 60,
      category: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      name: "晚餐",
      date: "2020-10-23",
      amount: 60,
      category: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      name: "捷運",
      date: "2020-10-23",
      amount: 120,
      category: '交通出行',
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      name: '電影：驚奇隊長',
      date: "2020-10-23",
      amount: 220,
      category: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      name: "租金",
      date: "2020-10-24",
      amount: 25000,
      category: '其他',
      icon: '<i class="fas fa-pen"></i>'
    },
  )

  // for (let i = 0; i < 10; i++) {
  //   Record.create({ name: 'name-' + i, date: "2020-10-23", amount: 300 })
  // }
  console.log('done')
})