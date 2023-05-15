const express = require('express')

const app = express()

const db = require('./queries')

const path = require('path')

const PORT = process.env.PORT || 8000

//middlware
/* --- */

//we are getting a static html file
app.use(express.static(path.resolve(__dirname, '../client/build')));

//return react frontend app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
})

app.get('/test', (req, res) => {
//do something with the res
})

//GET: /links
//Should return the links stored on your Postgres database
 app.get('/links', db.getLinks)
 
//GET: /links/:id
//Should return the links stored on your Postgres database
app.get('/links/:id', db.getLinksById)

//POST: /links
//Should return the links stored on your Postgres database
app.post('/links', db.createLink)

//PUT: /links/:id
//update link by id
app.put('/links/:id', db.updateLink)

//DELETE: /links/:id
app.delete('/links/:id', db.deleteLink)

app.listen(PORT, (req, res) => {
    console.log(`App is running on port ${PORT}.`)
})