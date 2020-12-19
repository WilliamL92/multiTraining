const express = require('express')
const io = require('socket.io')()
const app = express()
const port = 3000

app.use(express.static(__dirname+'/../client'));

app.get('/', (req, res) => {
  res.render(__dirname+'/../client/index.html', {})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})