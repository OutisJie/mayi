const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/single', (req, res) => {
  setTimeout(() => {
    res.send('request ok')
  }, 1000)
})
app.get('/success', (req, res) => {
  setTimeout(() => {
    res.send('request ok')
  }, 2000)
})
app.get('/error', (req, res) => {
  setTimeout(() => {
    res.status(500)
    res.send('request error')
  }, 2000)
})

const port = 3001
app.listen(port, () => {
    console.log(`application is listening at http://localhost:${port}`)
})