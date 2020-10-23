const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('this is a expense-tracker')
})

app.listen(port, () => {
  console.log(`this express is running on http://localhost:${port}`)
})