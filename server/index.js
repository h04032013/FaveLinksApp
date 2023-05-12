const express = require('express')

const app = express()

const db = require('./queries')

const path = require('path')

const PORT = process.env.PORT || 8000

//middlware

//const cors = require('cors')
//app.use(cors());
app.use(express.json())

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
//Should retrieve a link by id
app.get("/links/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const link = await pool.query("SELECT * FROM links WHERE ID = $1", [id]);
        res.json(link.rows[0]);

    } catch (error) {
        console.error(error.message)
    }
})


//POST: /links
//Should create a new link
app.post("/links", async (req, res) => {
    try {
        const { name, URL } = req.body;
        const newLink = await pool.query("INSERT INTO links (name, URL) VALUES($1, $2) RETURNING *", [name, URL]);
        res.json(newLink.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

//PUT: /links/:id
//Should update a link at a specific id
app.put("/links/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { URL } = req.body;
        const updateLink = await pool.query("UPDATE links SET name = $1, URL = $2 WHERE ID = $3", [name, URL, id]);
        res.json("link was updated!")

    } catch (error) {
        console.error(error.message)
    }
})
//DELETE: /links/:id
//Should delete a link at a specific id
app.delete("/links/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteLink = await pool.query("DELETE FROM links WHERE ID = $1", [id]);
        res.json("Todo was deleted!")

    } catch (error) {
        console.error(error.message)
    }
})

app.listen(PORT, (req, res) => {
    console.log(`App is running on port ${PORT}.`)
})