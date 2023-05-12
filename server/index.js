const express = require('express')

const app = express()

const db = require('./queries')

const path = require('path')

const PORT = 8000

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
})

app.get('/test', (req, res) => {
//do something with the res
})

app.get('/links', db.getLinks)

app.listen(PORT, (req, res) => {
    console.log(`App is running on port ${PORT}.`)
})